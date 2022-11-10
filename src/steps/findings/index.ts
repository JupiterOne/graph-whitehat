import {
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import generateKey from '../../utils/generateKey';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { WhitehatFinding } from '../../types';
import {
  Steps,
  Entities,
  Relationships,
  mappedRelationships,
} from '../constants';
import {
  createApplicationFindingRelationship,
  createFindingCweMappedRelationship,
  createFindingEntity,
  createScanFindingRelationship,
  createSiteFindingRelationship,
} from './converter';

export async function fetchFindings({
  jobState,
  instance,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await apiClient.iterateFindings(async (finding) => {
    const findingEntity = createFindingEntity(finding);
    if (!(await jobState.hasKey(findingEntity._key))) {
      await jobState.addEntity(findingEntity);
    }

    const type = finding.asset.type;
    if (type === 'application') {
      const applicationEntity = await jobState.findEntity(
        generateKey(Entities.APPLICATION._type, finding.asset.subID),
      );

      if (applicationEntity) {
        const findingApplicationRelationship =
          createApplicationFindingRelationship({
            applicationEntity,
            findingEntity,
          });

        if (!(await jobState.hasKey(findingApplicationRelationship._key))) {
          await jobState.addRelationship(findingApplicationRelationship);
        }
      }
    } else if (type === 'site') {
      const siteEntity = await jobState.findEntity(
        generateKey(Entities.SITE._type, finding.asset.subID),
      );

      if (siteEntity) {
        const findingSiteRelationship = createSiteFindingRelationship({
          siteEntity,
          findingEntity,
        });

        if (!(await jobState.hasKey(findingSiteRelationship._key))) {
          await jobState.addRelationship(findingSiteRelationship);
        }
      }
    }
  }, `&fields=likelihoodRating%2CimpactRating%2CcvssV3`);
}

export async function buildFindingScanRelationship({
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.FINDING._type },
    async (findingEntity) => {
      const finding = getRawData<WhitehatFinding>(findingEntity);
      if (!finding) {
        logger.warn(
          { _key: findingEntity._key },
          'Could not get raw data for finding entity',
        );
        return;
      }

      const scanEntity = await jobState.findEntity(
        generateKey(Entities.ASSESSMENT._type, finding.asset.subID),
      );

      if (scanEntity) {
        const findingScanRelationship = createScanFindingRelationship({
          scanEntity,
          findingEntity,
        });

        if (!(await jobState.hasKey(findingScanRelationship._key))) {
          await jobState.addRelationship(findingScanRelationship);
        }
      }
    },
  );
}

export async function buildFindingCweRelationship({
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.FINDING._type },
    async (findingEntity) => {
      const finding = getRawData<WhitehatFinding>(findingEntity);
      if (!finding) {
        logger.warn(
          { _key: findingEntity._key },
          'Could not get raw data for finding entity',
        );
        return;
      }

      const subTypeTags = finding.subTypeTags;
      if (subTypeTags?.length > 0) {
        for (const tag of subTypeTags) {
          const lowerCaseTag = tag.toLowerCase();
          if (lowerCaseTag.includes('cwe')) {
            await jobState.addRelationship(
              createFindingCweMappedRelationship({
                findingEntity,
                cwe: lowerCaseTag,
              }),
            );
          }
        }
      }
    },
  );
}

export const findingSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.FINDINGS.id,
    name: Steps.FINDINGS.name,
    entities: [Entities.FINDING],
    relationships: [
      Relationships.APPLICATION_HAS_FINDING,
      Relationships.SITE_HAS_FINDING,
    ],
    dependsOn: [Steps.APPLICATION.id, Steps.SITES.id],
    executionHandler: fetchFindings,
  },
  {
    id: Steps.BUILD_FINDING_SCAN.id,
    name: Steps.BUILD_FINDING_SCAN.name,
    entities: [],
    relationships: [Relationships.ASSESSMENT_IDENTIFIED_FINDING],
    dependsOn: [
      Steps.FINDINGS.id,
      Steps.APP_ASSESSMENTS.id,
      Steps.SITE_ASSESSMENTS.id,
    ],
    executionHandler: buildFindingScanRelationship,
  },
  {
    id: Steps.BUILD_FINDING_EXPLOIT.id,
    name: Steps.BUILD_FINDING_EXPLOIT.name,
    entities: [],
    relationships: [],
    mappedRelationships: [mappedRelationships.FINDING_EXPLOITS_CWE],
    dependsOn: [Steps.FINDINGS.id],
    executionHandler: buildFindingCweRelationship,
  },
];

import {
  Entity,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import { WhitehatApplication, WhitehatSite } from '../../types';
import {
  Steps,
  Entities,
  Relationships,
  SERVICE_ENTITY_KEY,
} from '../constants';
import {
  createApplicationScanEntity,
  createServiceScansRelationship,
  createAssessmentApplicationRelationship,
  createSiteScanEntity,
  createAssessmentSiteRelationship,
} from './converter';

export async function fetchApplicationAssessments({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const serviceEntity = (await jobState.getData(SERVICE_ENTITY_KEY)) as Entity;

  await jobState.iterateEntities(
    { _type: Entities.APPLICATION._type },
    async (applicationEntity) => {
      const application = getRawData<WhitehatApplication>(applicationEntity);

      if (!application) {
        logger.warn(
          `Can not get raw data for entity: ${applicationEntity._key}`,
        );
        return;
      }

      await apiClient.iterateApplicationScans(
        application.id,
        async (appScan) => {
          const scanEntity = await jobState.addEntity(
            createApplicationScanEntity(appScan),
          );

          await jobState.addRelationships([
            createAssessmentApplicationRelationship({
              scanEntity,
              applicationEntity,
            }),
            createServiceScansRelationship({
              scanEntity,
              serviceEntity,
            }),
          ]);
        },
      );
    },
  );
}

export async function fetchSiteAssessments({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const serviceEntity = (await jobState.getData(SERVICE_ENTITY_KEY)) as Entity;

  await jobState.iterateEntities(
    { _type: Entities.SITE._type },
    async (siteEntity) => {
      const site = getRawData<WhitehatSite>(siteEntity);

      if (!site) {
        logger.warn(`Can not get raw data for entity: ${siteEntity._key}`);
        return;
      }

      const siteScans = await apiClient.getSiteScans(site.id);
      if (siteScans) {
        const scanEntity = await jobState.addEntity(
          createSiteScanEntity(siteScans),
        );

        await jobState.addRelationships([
          createAssessmentSiteRelationship({
            scanEntity,
            siteEntity,
          }),
          createServiceScansRelationship({
            scanEntity,
            serviceEntity,
          }),
        ]);
      }
    },
  );
}

export const scanSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.APP_ASSESSMENTS.id,
    name: Steps.APP_ASSESSMENTS.name,
    entities: [Entities.ASSESSMENT],
    relationships: [
      Relationships.SERVICE_PERFORMED_ASSESSMENT,
      Relationships.APPLICATION_HAS_ASSESSMENT,
    ],
    dependsOn: [Steps.APPLICATION.id, Steps.SERVICE.id],
    executionHandler: fetchApplicationAssessments,
  },
  {
    id: Steps.SITE_ASSESSMENTS.id,
    name: Steps.SITE_ASSESSMENTS.name,
    entities: [Entities.ASSESSMENT],
    relationships: [
      Relationships.SERVICE_PERFORMED_ASSESSMENT,
      Relationships.SITE_HAS_ASSESSMENT,
    ],
    dependsOn: [Steps.SITES.id, Steps.SERVICE.id],
    executionHandler: fetchSiteAssessments,
  },
];

import {
  IntegrationStep,
  IntegrationStepExecutionContext,
  getRawData,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import { WhitehatApplication, WhitehatAsset } from '../../types';
import { Steps, Entities, Relationships } from '../constants';
import {
  createApplicationAssetRelationship,
  createApplicationCodebaseRelationship,
  createApplicationEntity,
  createCodebaseEntity,
} from './converter';

export async function fetchApplications({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.ASSET._type },
    async (assetEntity) => {
      const asset = getRawData<WhitehatAsset>(assetEntity);

      if (!asset)
        logger.warn(
          `Can not get raw data for asset entity: ${assetEntity._key}`,
        );
      else {
        if (asset.type === 'application') {
          const application = await apiClient.getApplication(asset.subID);

          if (application) {
            const applicationEntity = await jobState.addEntity(
              createApplicationEntity(application),
            );
            await jobState.addRelationship(
              createApplicationAssetRelationship({
                assetEntity,
                applicationEntity,
              }),
            );
          }
        }
      }
    },
  );
}

export async function fetchCodebases({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.APPLICATION._type },
    async (applicationEntity) => {
      const application = getRawData<WhitehatApplication>(applicationEntity);

      if (!application)
        logger.warn(
          `Can not get raw data for application entity: ${applicationEntity._key}`,
        );
      else {
        const codebases = await apiClient.getCodebases(application.id);
        for (const codebase of codebases.collection) {
          const codebaseEntity = await jobState.addEntity(
            createCodebaseEntity(codebase),
          );
          await jobState.addRelationship(
            createApplicationCodebaseRelationship({
              applicationEntity,
              codebaseEntity,
            }),
          );
        }
      }
    },
  );
}

export const applicationSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.APPLICATION.id,
    name: Steps.APPLICATION.name,
    entities: [Entities.APPLICATION],
    relationships: [Relationships.ASSET_HAS_APPLICATION],
    dependsOn: [Steps.ASSETS.id],
    executionHandler: fetchApplications,
  },
  {
    id: Steps.CODEBASES.id,
    name: Steps.CODEBASES.name,
    entities: [Entities.CODEBASE],
    relationships: [Relationships.APPLICATION_HAS_CODEBASE],
    dependsOn: [Steps.APPLICATION.id],
    executionHandler: fetchCodebases,
  },
];

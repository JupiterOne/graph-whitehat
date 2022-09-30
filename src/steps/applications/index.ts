import {
  IntegrationStep,
  IntegrationStepExecutionContext,
  getRawData,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import { WhitehatAsset } from '../../types';
import { Steps, Entities, Relationships } from '../constants';
import {
  createApplicationAssetRelationship,
  createApplicationEntity,
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

export const applicationSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.APPLICATION.id,
    name: Steps.APPLICATION.name,
    entities: [Entities.APPLICATION],
    relationships: [Relationships.ASSET_HAS_APPLICATION],
    dependsOn: [Steps.ASSETS.id],
    executionHandler: fetchApplications,
  },
];

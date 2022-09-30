import {
  IntegrationStep,
  IntegrationStepExecutionContext,
  getRawData,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import { WhitehatAsset } from '../../types';
import { Steps, Entities, Relationships } from '../constants';
import { createSiteAssetRelationship, createSiteEntity } from './converter';

export async function fetchSites({
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
        if (asset.type === 'site') {
          const site = await apiClient.getSite(asset.subID);

          if (site) {
            const siteEntity = await jobState.addEntity(createSiteEntity(site));

            await jobState.addRelationship(
              createSiteAssetRelationship({ assetEntity, siteEntity }),
            );
          }
        }
      }
    },
  );
}

export const siteSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.SITES.id,
    name: Steps.SITES.name,
    entities: [Entities.SITE],
    relationships: [Relationships.ASSET_HAS_SITE],
    dependsOn: [Steps.ASSETS.id],
    executionHandler: fetchSites,
  },
];

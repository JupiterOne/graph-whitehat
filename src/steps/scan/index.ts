import {
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import { WhitehatAsset } from '../../types';
import { Steps, Entities, Relationships } from '../constants';
import {
  createApplicationScanEntity,
  createAppScanAssetRelationship,
  createSiteScanAssetRelationship,
  createSiteScanEntity,
} from './converter';

export async function fetchAppScans({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.ASSET._type },
    async (assetEntity) => {
      const asset = getRawData<WhitehatAsset>(assetEntity);

      if (!asset) {
        logger.warn(`Can not get raw data for entity: ${assetEntity._key}`);
        return;
      }

      if (asset.type === 'application') {
        await apiClient.iterateApplicationScans(
          asset.subID,
          async (appScan) => {
            const appScanEntity = await jobState.addEntity(
              createApplicationScanEntity(appScan),
            );

            await jobState.addRelationship(
              createAppScanAssetRelationship({
                appScanEntity,
                assetEntity,
              }),
            );
          },
        );
      }
    },
  );
}

export async function fetchSiteScans({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.ASSET._type },
    async (assetEntity) => {
      const asset = getRawData<WhitehatAsset>(assetEntity);

      if (!asset) {
        logger.warn(`Can not get raw data for entity: ${assetEntity._key}`);
        return;
      }

      if (asset.type === 'site') {
        const siteScan = await apiClient.getSiteScans(asset.subID);
        if (siteScan) {
          const siteScanEntity = await jobState.addEntity(
            createSiteScanEntity(siteScan),
          );

          await jobState.addRelationship(
            createSiteScanAssetRelationship({
              siteScanEntity,
              assetEntity,
            }),
          );
        }
      }
    },
  );
}

export const scanSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.APP_SCANS.id,
    name: Steps.APP_SCANS.name,
    entities: [Entities.APP_SCAN],
    relationships: [Relationships.APP_SCAN_SCANS_ASSET],
    dependsOn: [Steps.ASSETS.id],
    executionHandler: fetchAppScans,
  },
  {
    id: Steps.SITE_SCAN.id,
    name: Steps.SITE_SCAN.name,
    entities: [Entities.SITE_SCAN],
    relationships: [Relationships.SITE_SCAN_SCANS_ASSET],
    dependsOn: [Steps.ASSETS.id],
    executionHandler: fetchSiteScans,
  },
];

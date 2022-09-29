import {
  Entity,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import { WhitehatAsset } from '../../types';
import {
  Steps,
  Entities,
  Relationships,
  SERVICE_ENTITY_KEY,
} from '../constants';
import {
  createApplicationScanEntities,
  createAppScansAssetRelationships,
  createServiceScansRelationships,
  createSiteScansAssetRelationships,
  createSiteScanEntities,
} from './converter';

export async function fetchAppScans({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const serviceEntity = (await jobState.getData(SERVICE_ENTITY_KEY)) as Entity;

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
            const appScanEntities = await jobState.addEntities(
              createApplicationScanEntities(appScan),
            );

            await jobState.addRelationships([
              ...createAppScansAssetRelationships({
                appScanEntities,
                assetEntity,
              }),
              ...createServiceScansRelationships({
                scanEntities: appScanEntities,
                serviceEntity,
              }),
            ]);
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
  const serviceEntity = (await jobState.getData(SERVICE_ENTITY_KEY)) as Entity;

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
          const siteScanEntities = await jobState.addEntities(
            createSiteScanEntities(siteScan),
          );

          await jobState.addRelationships([
            ...createSiteScansAssetRelationships({
              siteScanEntities,
              assetEntity,
            }),
            ...createServiceScansRelationships({
              scanEntities: siteScanEntities,
              serviceEntity,
            }),
          ]);
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
    relationships: [
      Relationships.APP_SCAN_SCANS_ASSET,
      Relationships.SERVICE_PERFORMED_APP_SCAN,
    ],
    dependsOn: [Steps.ASSETS.id, Steps.SERVICE.id],
    executionHandler: fetchAppScans,
  },
  {
    id: Steps.SITE_SCAN.id,
    name: Steps.SITE_SCAN.name,
    entities: [Entities.SITE_SCAN],
    relationships: [
      Relationships.SITE_SCAN_SCANS_ASSET,
      Relationships.SERVICE_PERFORMED_SITE_SCAN,
    ],
    dependsOn: [Steps.ASSETS.id, Steps.SERVICE.id],
    executionHandler: fetchSiteScans,
  },
];

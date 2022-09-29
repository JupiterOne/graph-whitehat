import {
  IntegrationStep,
  IntegrationStepExecutionContext,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import {
  Steps,
  Entities,
  Relationships,
  ACCOUNT_ENTITY_KEY,
} from '../constants';
import { createAccountAssetRelationship, createAssetEntity } from './converter';

export async function fetchAssets({
  jobState,
  instance,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateAssets(async (asset) => {
    const assetEntity = await jobState.addEntity(createAssetEntity(asset));

    await jobState.addRelationship(
      createAccountAssetRelationship({ accountEntity, assetEntity }),
    );
  });
}

export const assetSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ASSETS.id,
    name: Steps.ASSETS.name,
    entities: [Entities.ASSET],
    relationships: [Relationships.ACCOUNT_HAS_ASSET],
    dependsOn: [Steps.ACCOUNT.id],
    executionHandler: fetchAssets,
  },
];

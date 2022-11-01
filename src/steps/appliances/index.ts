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
import {
  createAccountApplianceRelationship,
  createApplianceEntity,
} from './converter';

export async function fetchAppliances({
  jobState,
  instance,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateAppliances(async (appliance) => {
    const applianceEntity = await jobState.addEntity(
      createApplianceEntity(appliance),
    );

    await jobState.addRelationship(
      createAccountApplianceRelationship({ accountEntity, applianceEntity }),
    );
  });
}

export const applianceSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.APPLIANCES.id,
    name: Steps.APPLIANCES.name,
    entities: [Entities.APPLIANCE],
    relationships: [Relationships.ACCOUNT_HAS_APPLIANCE],
    dependsOn: [Steps.ACCOUNT.id],
    executionHandler: fetchAppliances,
  },
];

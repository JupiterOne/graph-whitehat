import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import {
  Steps,
  Entities,
  ACCOUNT_ENTITY_KEY,
  SERVICES,
  Relationships,
} from '../constants';
import {
  createAccountServiceRelationship,
  createServiceEntity,
} from './converter';

export async function fetchServices({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  for (const SERVICE of Object.values(SERVICES)) {
    const serviceEntity = await jobState.addEntity(
      createServiceEntity(SERVICE),
    );

    await jobState.addRelationship(
      createAccountServiceRelationship({ accountEntity, serviceEntity }),
    );
  }
}

export const serviceSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.SERVICES.id,
    name: Steps.SERVICES.name,
    entities: [Entities.SERVICE],
    relationships: [Relationships.ACCOUNT_HAS_SERVICE],
    dependsOn: [Steps.ACCOUNT.id],
    executionHandler: fetchServices,
  },
];

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
  Relationships,
  SERVICE_ENTITY_KEY,
} from '../constants';
import {
  createAccountServiceRelationship,
  createServiceEntity,
} from './converter';

export async function fetchServices({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  const serviceEntity = await jobState.addEntity(createServiceEntity());

  await jobState.addRelationship(
    createAccountServiceRelationship({ accountEntity, serviceEntity }),
  );

  await jobState.setData(SERVICE_ENTITY_KEY, serviceEntity);
}

export const serviceSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.SERVICE.id,
    name: Steps.SERVICE.name,
    entities: [Entities.SERVICE],
    relationships: [Relationships.ACCOUNT_HAS_SERVICE],
    dependsOn: [Steps.ACCOUNT.id],
    executionHandler: fetchServices,
  },
];

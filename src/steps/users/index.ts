import {
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import {
  Steps,
  Entities,
  ACCOUNT_ENTITY_KEY,
  Relationships,
} from '../constants';
import { createAccountUserRelationship, createUserEntity } from './converter';

export async function fetchUsers({
  jobState,
  instance,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateUsers(async (user) => {
    const userEntity = await jobState.addEntity(createUserEntity(user));

    await jobState.addRelationship(
      createAccountUserRelationship({ accountEntity, userEntity }),
    );
  });
}

export const userSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.USERS.id,
    name: Steps.USERS.name,
    entities: [Entities.USER],
    relationships: [Relationships.ACCOUNT_HAS_USER],
    dependsOn: [Steps.ACCOUNT.id],
    executionHandler: fetchUsers,
  },
];

import {
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import generateKey from '../../../utils/generateKey';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import { WhitehatRole } from '../../types';
import { Steps, Entities, Relationships } from '../constants';
import { createRoleEntity, createRoleUserRelationship } from './converter';

export async function fetchRoles({
  jobState,
  instance,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  const { collection: roles } = await apiClient.getRoles();
  if (roles)
    for (const role of roles) await jobState.addEntity(createRoleEntity(role));
}

export async function buildUserRole({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.ROLE._type },
    async (roleEntity) => {
      const role = getRawData<WhitehatRole>(roleEntity);
      if (!role)
        logger.warn(`Can not get raw data for role entity: ${roleEntity._key}`);
      else {
        await apiClient.iterateUsers(async (user) => {
          const userEntity = await jobState.findEntity(
            generateKey(Entities.USER._type, user.id),
          );

          if (userEntity)
            await jobState.addRelationship(
              createRoleUserRelationship({ userEntity, roleEntity }),
            );
        }, `&roleID=${role.id}`);
      }
    },
  );
}

export const roleSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ROLES.id,
    name: Steps.ROLES.name,
    entities: [Entities.ROLE],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchRoles,
  },
  {
    id: Steps.BUILD_USER_ROLE.id,
    name: Steps.BUILD_USER_ROLE.name,
    entities: [],
    relationships: [Relationships.USER_ASSIGNED_ROLE],
    dependsOn: [Steps.USERS.id, Steps.ROLES.id],
    executionHandler: buildUserRole,
  },
];

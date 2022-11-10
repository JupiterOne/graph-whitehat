import {
  Entity,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import generateKey from '../../utils/generateKey';
import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { WhitehatGroup } from '../../types';
import {
  Steps,
  Entities,
  ACCOUNT_ENTITY_KEY,
  Relationships,
} from '../constants';
import {
  createGroupAccountRelationship,
  createGroupEntity,
  createGroupUserRelationship,
} from './converter';

export async function fetchGroups({
  jobState,
  instance,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateGroups(async (group) => {
    const groupEntity = await jobState.addEntity(createGroupEntity(group));

    await jobState.addRelationship(
      createGroupAccountRelationship({
        accountEntity,
        groupEntity,
      }),
    );
  });
}

export async function buildUserGroup({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.GROUP._type },
    async (groupEntity) => {
      const group = getRawData<WhitehatGroup>(groupEntity);
      if (!group) {
        logger.warn(
          { _key: groupEntity._key },
          'Could not get raw data for group entity',
        );
        return;
      }

      await apiClient.iterateUsers(async (user) => {
        const userEntity = await jobState.findEntity(
          generateKey(Entities.USER._type, user.id),
        );

        if (userEntity) {
          await jobState.addRelationship(
            createGroupUserRelationship({ userEntity, groupEntity }),
          );
        }
      }, `&groupID=${group.id}`);
    },
  );
}

export const groupSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.GROUPS.id,
    name: Steps.GROUPS.name,
    entities: [Entities.GROUP],
    relationships: [Relationships.ACCOUNT_HAS_GROUP],
    dependsOn: [Steps.ACCOUNT.id],
    executionHandler: fetchGroups,
  },
  {
    id: Steps.BUILD_USER_GROUP.id,
    name: Steps.BUILD_USER_GROUP.name,
    entities: [],
    relationships: [Relationships.GROUP_HAS_USER],
    dependsOn: [Steps.GROUPS.id, Steps.USERS.id],
    executionHandler: buildUserGroup,
  },
];

import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import generateKey from '../../../utils/generateKey';
import { WhitehatGroup } from '../../types';

import { Entities } from '../constants';

export function createGroupEntity(data: WhitehatGroup): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: generateKey(Entities.GROUP._type, data.id),
        _type: Entities.GROUP._type,
        _class: Entities.GROUP._class,
        id: data.id.toString(),
        name: data.name,
        description: data.description,
        createdOn: parseTimePropertyValue(data.created, 'sec'),
      },
    },
  });
}

export function createGroupAccountRelationship({
  accountEntity,
  groupEntity,
}: {
  accountEntity: Entity;
  groupEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: accountEntity,
    to: groupEntity,
  });
}

export function createGroupUserRelationship({
  userEntity,
  groupEntity,
}: {
  userEntity: Entity;
  groupEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: groupEntity,
    to: userEntity,
  });
}

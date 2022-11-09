import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import generateKey from '../../utils/generateKey';
import { WhitehatRole } from '../../types';

import { Entities } from '../constants';

export function createRoleEntity(data: WhitehatRole): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: generateKey(Entities.ROLE._type, data.id),
        _type: Entities.ROLE._type,
        _class: Entities.ROLE._class,
        id: data.id.toString(),
        name: data.name,
      },
    },
  });
}

export function createRoleUserRelationship({
  userEntity,
  roleEntity,
}: {
  userEntity: Entity;
  roleEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.ASSIGNED,
    from: userEntity,
    to: roleEntity,
  });
}

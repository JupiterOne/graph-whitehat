import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { WhitehatService } from '../../types';

import { Entities } from '../constants';

export function createServiceEntity(data: WhitehatService): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: data._key,
        _type: Entities.SERVICE._type,
        _class: Entities.SERVICE._class,
        category: [data.category],
        displayName: data.displayName,
        name: data.name,
        function: [data.function],
      },
    },
  });
}

export function createAccountServiceRelationship({
  accountEntity,
  serviceEntity,
}: {
  accountEntity: Entity;
  serviceEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: accountEntity,
    to: serviceEntity,
  });
}

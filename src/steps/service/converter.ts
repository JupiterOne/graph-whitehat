import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';

export function createServiceEntity(): Entity {
  const service = {
    _key: `whitehat-service`,
    category: ['software'],
    displayName: 'Whitehat Scanning Service',
    name: 'Whitehat Scanning Service',
    function: ['Vulnerability scanning'],
  };

  return createIntegrationEntity({
    entityData: {
      source: service,
      assign: {
        _key: service._key,
        _type: Entities.SERVICE._type,
        _class: Entities.SERVICE._class,
        category: service.category,
        displayName: service.displayName,
        name: service.name,
        function: service.function,
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

import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import generateKey from '../../utils/generateKey';
import { WhitehatEventSubscriptions } from '../../types';

import { Entities } from '../constants';

export function createServiceEntity([
  data,
]: WhitehatEventSubscriptions[]): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: generateKey(Entities.SERVICE._type, 'service'),
        _type: Entities.SERVICE._type,
        _class: Entities.SERVICE._class,
        category: ['software'],
        displayName: 'Whitehat Scanning Service',
        name: 'Whitehat Scanning Service',
        function: ['Vulnerability Scanning'],
        subscriptionGroupType: data.subscriptionGroupType,
        allEventsSubscribed: data.allEventsSubscribed,
        subscriptionGroupEvents: data.subscriptionGroupEvents.map(
          (e) => e.description,
        ),
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

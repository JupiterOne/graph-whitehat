import {
  createIntegrationEntity,
  Entity,
  Relationship,
  createDirectRelationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import generateKey from '../../../utils/generateKey';
import { WhitehatEndpoint } from '../../types';

import { Entities } from '../constants';

export function createEndpointEntity(data: WhitehatEndpoint): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: generateKey(Entities.ENDPOINT._type, data.id),
        _type: Entities.ENDPOINT._type,
        _class: Entities.ENDPOINT._class,
        id: data.id.toString(),
        siteId: data.siteID,
      },
    },
  });
}

export function createSiteEndpointRelationship({
  siteEntity,
  endpointEntity,
}: {
  siteEntity: Entity;
  endpointEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: siteEntity,
    to: endpointEntity,
  });
}

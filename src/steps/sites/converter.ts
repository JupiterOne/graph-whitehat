import {
  createIntegrationEntity,
  Entity,
  Relationship,
  createDirectRelationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import generateKey from '../../../utils/generateKey';
import { WhitehatSite } from '../../types';

import { Entities } from '../constants';

export function createSiteEntity(data: WhitehatSite): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: generateKey(Entities.SITE._type, data.id),
        _type: Entities.SITE._type,
        _class: Entities.SITE._class,
        id: data.id.toString(),
        clientId: data.clientID,
        name: data.name,
        organization: data.organization,
        abbreviation: data.abbreviation,
        hostname: data.hostname,
        associatedHostname: data.associatedHostname,
        industry: data.industry,
        weight: data.weight,
        speed: data.speed,
        usesSatellite: data.usesSatellite,
        webLink: data.hostname,
      },
    },
  });
}

export function createSiteAssetRelationship({
  siteEntity,
  assetEntity,
}: {
  siteEntity: Entity;
  assetEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: assetEntity,
    to: siteEntity,
  });
}

import {
  createIntegrationEntity,
  Entity,
  Relationship,
  createDirectRelationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import generateKey from '../../../utils/generateKey';
import { WhitehatAppliance } from '../../types';

import { Entities } from '../constants';

export function createApplianceEntity(data: WhitehatAppliance): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: generateKey(Entities.APPLIANCE._type, data.id),
        _type: Entities.APPLIANCE._type,
        _class: Entities.APPLIANCE._class,
        category: ['application'],
        function: ['remote-access-gateway'],
        public: false,
        id: data.id.toString(),
        name: data.label,
        label: data.label,
        type: data.type,
        status: data.status,
        ubuntuVersion: data.ubuntuVersion,
        clientId: data.clientID,
        cloudRequestProgress: data.cloudRequestProgress,
        associatedAssetCount: data.associatedAssetCount,
        averageLinesOfCode: data.averageLinesOfCode,
        migrationStatus: data.migrationStatus,
        satelliteId: data.satelliteID,
        serverConfAssetCount: data.serverConfAssetCount,
      },
    },
  });
}

export function createAccountApplianceRelationship({
  accountEntity,
  applianceEntity,
}: {
  accountEntity: Entity;
  applianceEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: accountEntity,
    to: applianceEntity,
  });
}

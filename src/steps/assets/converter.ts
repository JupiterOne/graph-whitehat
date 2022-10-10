import {
  createIntegrationEntity,
  Entity,
  Relationship,
  createDirectRelationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import generateKey from '../../../utils/generateKey';
import { WhitehatAsset } from '../../types';
import { Entities } from '../constants';

export function createAssetEntity(data: WhitehatAsset): Entity {
  const { tags, ...rest } = data;
  return createIntegrationEntity({
    entityData: {
      source: rest,
      assign: {
        _key: generateKey(Entities.ASSET._type, data.id),
        _type: Entities.ASSET._type,
        _class: Entities.ASSET._class,
        id: data.id.toString(),
        subId: data.subID,
        name: data.name,
        type: data.type,
        location: data.location,
        serviceLevel: data.serviceLevel,
        clientRatingMethod: data.clientRatingMethod,
        phase: data.phase,
        status: data.status,
        customAssetId: data.customAssetID,
        scheduleName: data.scheduleName,
        scheduleTimeZone: data.scheduleTimeZone,
        createdOn: data.creationT,
        lang: data.lang,
        averageLinesScanned: data.averageLinesScanned,
        lastScanOn: data.lastScanDateT,
        scanStatus: data.scanStatus,
        isWhiteHatEnabled: data.isWhiteHatEnabled,
        activeUser: data.activeUser,
        keepUnreachableFindingsOpenBool: data.keepUnreachableFindingsOpen.Bool,
        keepUnreachableFindingsOpenValid:
          data.keepUnreachableFindingsOpen.Valid,
      },
    },
  });
}

export function createAccountAssetRelationship({
  accountEntity,
  assetEntity,
}: {
  accountEntity: Entity;
  assetEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: accountEntity,
    to: assetEntity,
  });
}

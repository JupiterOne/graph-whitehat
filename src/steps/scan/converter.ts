import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import generateKey from '../../../utils/generateKey';
import { WhitehatAppScan, WhitehatSiteScan } from '../../types';

import { Entities } from '../constants';

export function createApplicationScanEntity(data: WhitehatAppScan): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: generateKey(Entities.APP_SCAN._type, data.id),
        _type: Entities.APP_SCAN._type,
        _class: Entities.APP_SCAN._class,
        id: data.id.toString(),
        tag: data.tag,
        filename: data.filename,
        name: data.filename,
        requestedBy: data.requestedBy,
        username: data.username,
        uploadedOn: parseTimePropertyValue(data.uploadedOn),
        completedOn: parseTimePropertyValue(data.completedOn),
        applicationSize: data.applicationSize,
        linesOfCode: data.linesOfCode,
        appId: data.appID,
        assetId: data.assetID,
        status: data.status,
        engineConfBinaryExclustions: data.engineConf.binary_exclusions,
        engineConfBinaryInclusions: data.engineConf.binary_inclusions,
        engineConfExcludeDirectories: data.engineConf.exclude_directories,
        engineConfExcludeDirectoriesConsole:
          data.engineConf.exclude_directories_console,
        instanceId: data.instanceID,
        category: 'Vulnerability Scan',
        summary: `${data.filename} scan requested by ${data.requestedBy}`,
        internal: true,
      },
    },
  });
}

export function createSiteScanEntity(data: WhitehatSiteScan): Entity {
  const { scanInstanceIds, authSchemaIds, endedOnList } =
    data.collection.reduce<{
      scanInstanceIds: string[];
      authSchemaIds: number[];
      endedOnList: string[];
    }>(
      (acc, scan) => {
        return {
          scanInstanceIds: [...acc.scanInstanceIds, scan.scan_instance_id],
          authSchemaIds: [...acc.authSchemaIds, scan.auth_schema_id],
          endedOnList: [...acc.endedOnList, scan.end_date],
        };
      },
      { scanInstanceIds: [], authSchemaIds: [], endedOnList: [] },
    );

  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: generateKey(Entities.SITE_SCAN._type, data.slot_id),
        _type: Entities.SITE_SCAN._type,
        _class: Entities.SITE_SCAN._class,
        id: data.slot_id,
        name: data.href,
        scanInstanceIds,
        authSchemaIds,
        endedOnList,
        category: 'Vulnerability Scan',
        summary: `${data.href} scan`,
        internal: false,
        webLink: `https://sentinel.whitehatsec.com${data.href}`,
      },
    },
  });
}

export function createAppScanAssetRelationship({
  appScanEntity,
  assetEntity,
}: {
  appScanEntity: Entity;
  assetEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.SCANS,
    from: appScanEntity,
    to: assetEntity,
  });
}

export function createSiteScanAssetRelationship({
  siteScanEntity,
  assetEntity,
}: {
  siteScanEntity: Entity;
  assetEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.SCANS,
    from: siteScanEntity,
    to: assetEntity,
  });
}

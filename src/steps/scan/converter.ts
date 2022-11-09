import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import generateKey from '../../utils/generateKey';
import { WhitehatAppScan, WhitehatSiteScan } from '../../types';

import { Entities } from '../constants';

export function createApplicationScanEntity(data: WhitehatAppScan): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: generateKey(Entities.ASSESSMENT._type, `${data.appID}`),
        _type: Entities.ASSESSMENT._type,
        _class: Entities.ASSESSMENT._class,
        id: data.id.toString(),
        tag: data.tag,
        filename: data.filename,
        name: data.filename,
        displayName: `${data.filename}`,
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

export function createSiteScanEntity(
  data: WhitehatSiteScan,
  siteId: number,
): Entity {
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
        _key: generateKey(Entities.ASSESSMENT._type, `${siteId}`),
        _type: Entities.ASSESSMENT._type,
        _class: Entities.ASSESSMENT._class,
        id: data.slot_id,
        displayName: `${data.href}`,
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

export function createAssessmentApplicationRelationship({
  scanEntity,
  applicationEntity,
}: {
  scanEntity: Entity;
  applicationEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: applicationEntity,
    to: scanEntity,
  });
}

export function createAssessmentSiteRelationship({
  scanEntity,
  siteEntity,
}: {
  scanEntity: Entity;
  siteEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: siteEntity,
    to: scanEntity,
  });
}

export function createServiceScansRelationship({
  serviceEntity,
  scanEntity,
}: {
  serviceEntity: Entity;
  scanEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.PERFORMED,
    from: serviceEntity,
    to: scanEntity,
  });
}

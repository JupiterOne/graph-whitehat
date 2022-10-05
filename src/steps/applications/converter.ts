import {
  createIntegrationEntity,
  Entity,
  Relationship,
  createDirectRelationship,
  RelationshipClass,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import generateKey from '../../../utils/generateKey';
import { WhitehatApplication, WhitehatCodebase } from '../../types';

import { Entities } from '../constants';

export function createApplicationEntity(data: WhitehatApplication): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: generateKey(Entities.APPLICATION._type, data.id),
        _type: Entities.APPLICATION._type,
        _class: Entities.APPLICATION._class,
        id: data.id.toString(),
        name: data.label,
        autoremediation: data.autoremediation,
        openVulnCount: data.open_vuln_count,
        vulnsFoundByEngine: data.vulns_found_by_engine,
        assetScanStatus: data.asset_scan_status,
        lastScanDuration: data.last_scan_duration,
        status: data.status,
        lineOfCode: data.line_of_code,
        clientId: data.client_id,
        hasSchedule: data.has_schedule,
        lastScanCompletedOn: parseTimePropertyValue(data.last_scan_completed),
        percentageOfLinesSentToWhitehat:
          data.percentage_of_lines_sent_to_whitehat,
        label: data.label,
        fileSizeScanned: data.file_size_scanned,
        language: data.language,
        createdOn: parseTimePropertyValue(data.created_t),
        serviceLevel: data.service_level,
        appFullScanEnabled: data.app_full_scan_enabled,
        isMobileBla: data.is_mobile_bla,
        href: data.href,
        isMobile: data.is_mobile,
      },
    },
  });
}

export function createCodebaseEntity(data: WhitehatCodebase): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: generateKey(Entities.CODEBASE._type, data.id),
        _type: Entities.CODEBASE._type,
        _class: Entities.CODEBASE._class,
        fileName: data.file_name,
        name: data.file_name || data.label,
        displayName: data.file_name || data.label,
        fileTreeJson: data.file_tree_json,
        repositoryType: data.repository_type,
        id: data.id,
        certificate: data.certificate,
        authType: data.auth_type,
        excludeDirs: data.exclude_dirs,
        href: data.href,
        username: data.username,
        repositoryRevision: data.repository_revision,
        label: data.label,
        repositoryUrl: data.repository_url,
        ...(data.repository_url && { webLink: data.repository_url }),
      },
    },
  });
}

export function createApplicationAssetRelationship({
  applicationEntity,
  assetEntity,
}: {
  applicationEntity: Entity;
  assetEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: assetEntity,
    to: applicationEntity,
  });
}

export function createApplicationCodebaseRelationship({
  applicationEntity,
  codebaseEntity,
}: {
  applicationEntity: Entity;
  codebaseEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: applicationEntity,
    to: codebaseEntity,
  });
}

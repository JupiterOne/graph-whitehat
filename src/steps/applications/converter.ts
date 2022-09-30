import {
  createIntegrationEntity,
  Entity,
  Relationship,
  createDirectRelationship,
  RelationshipClass,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import generateKey from '../../../utils/generateKey';
import { WhitehatApplication } from '../../types';

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

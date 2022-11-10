import {
  createIntegrationEntity,
  Entity,
  Relationship,
  createDirectRelationship,
  RelationshipClass,
  createMappedRelationship,
} from '@jupiterone/integration-sdk-core';
import generateKey from '../../utils/generateKey';
import { WhitehatComponent } from '../../types';

import { Entities, mappedRelationships } from '../constants';

export function createComponentEntity(data: WhitehatComponent): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: generateKey(Entities.COMPONENT._type, data.framework_id),
        _type: Entities.COMPONENT._type,
        _class: Entities.COMPONENT._class,
        sourceTypeName: data.source_type_name,
        latestVersion: data.latest_version,
        cves: data.cves?.map((cve) => cve.name),
        currentVersion: data.current_version,
        displayName: data.framework_pretty_name,
        versionsBehind: data.versions_behind,
        sourceFileName: data.source_file_name,
        licenses: data.licenses?.map((l) => l.name),
        frameworkId: data.framework_id,
        appId: data.app_id,
        name: data.framework_name,
        applicationName: data.application_name,
      },
    },
  });
}

export function createApplicationComponentRelationship({
  applicationEntity,
  componentEntity,
}: {
  applicationEntity: Entity;
  componentEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: applicationEntity,
    to: componentEntity,
  });
}

export function createComponentCveMappedRelationship({
  componentEntity,
  cve,
}: {
  componentEntity: Entity;
  cve: string;
}): Relationship {
  return createMappedRelationship({
    _class: mappedRelationships.COMPONENT_HAS_CVE._class,
    _type: mappedRelationships.COMPONENT_HAS_CVE._type,
    source: componentEntity,
    target: {
      _type: mappedRelationships.COMPONENT_HAS_CVE.targetType,
      _key: cve,
    },
    relationshipDirection: mappedRelationships.COMPONENT_HAS_CVE.direction,
  });
}

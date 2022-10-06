import {
  createDirectRelationship,
  createIntegrationEntity,
  createMappedRelationship,
  Entity,
  parseTimePropertyValue,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import generateKey from '../../../utils/generateKey';
import { WhitehatFinding } from '../../types';

import { Entities, mappedRelationships } from '../constants';

export function createFindingEntity(data: WhitehatFinding): Entity {
  const { tags, ...rest } = data;

  return createIntegrationEntity({
    entityData: {
      source: rest,
      assign: {
        _key: generateKey(Entities.FINDING._type, data.id),
        _type: Entities.FINDING._type,
        _class: Entities.FINDING._class,
        id: data.id.toString(),
        name: data.location,
        assetId: data.asset.id,
        assetName: data.asset.name,
        assetType: data.asset.type,
        assetRating: data.asset.rating,
        assetServiceLevel: data.asset.serviceLevel,
        assetSubId: data.asset.subID,
        assetClientId: data.asset.clientID,
        assetStatus: data.asset.status,
        assetCustomPolicyId: data.asset.customPolicyID,
        classId: data.class.id,
        className: data.class.name,
        classShortName: data.class.shortName,
        classDefaultRisk: data.class.defaultRisk,
        classRetired: data.class.retired,
        classHasApplications: data.class.hasApplications,
        classHasSites: data.class.hasSites,
        location: data.location,
        foundRevision: data.foundRevision,
        status: data.status,
        nonAcceptedStatus: data.nonAcceptedStatus,
        severity: data.severity?.toString() || '',
        threat: data.threat,
        impact: data.impact?.toString() || '',
        impactRating: data.impactRating,
        likelihood: data.likelihood,
        likelihoodRating: data.likelihoodRating,
        risk: data.risk,
        customRisk: data.customRisk,
        customAccepted: data.customAccepted,
        reason: data.reason,
        hasInstanceLevelCustomization: data.hasInstanceLevelCustomization,
        hasInstanceLevelCvssCustomization:
          data.hasInstanceLevelCVSSCustomization,
        lastRetested: data.lastRetested,
        retestStatus: data.retestStatus,
        firstOpenedOn: parseTimePropertyValue(data.firstOpened),
        opened: parseTimePropertyValue(data.opened),
        closed: parseTimePropertyValue(data.closed),
        lastModified: parseTimePropertyValue(data.lastModified),
        zeroDayTags: data.zeroDayTags,
        cveTags: data.cveTags,
        subTypeTags: data.subTypeTags,
        directRemediationAvailable: data.directRemediationAvailable,
        unreachable: data.unreachable,
        attackVectorsCount: data.attackVectorsCount,
        notesCount: data.notesCount,
        isAccessible: data.isAccessible,
        outOfScopeReasons: data.outOfScopeReasons,
        attackVectors: data.attackVectors,
        verificationStatus: data.verificationStatus,
        manual: data.manual,
        category: 'application',
        numericSeverity: parseInt(data.severity) || data.impact,
        open: data.status === 'open',
        score: data.cvssV3?.score,
        vector: Object.keys(data.cvssV3?.vector)
          .map((key) => {
            return `${key}:${data.cvssV3.vector[key]}`;
          })
          .join('/'),
      },
    },
  });
}

export function createApplicationFindingRelationship({
  applicationEntity,
  findingEntity,
}: {
  applicationEntity: Entity;
  findingEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: applicationEntity,
    to: findingEntity,
  });
}

export function createSiteFindingRelationship({
  siteEntity,
  findingEntity,
}: {
  siteEntity: Entity;
  findingEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: siteEntity,
    to: findingEntity,
  });
}

export function createScanFindingRelationship({
  scanEntity,
  findingEntity,
}: {
  scanEntity: Entity;
  findingEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.IDENTIFIED,
    from: scanEntity,
    to: findingEntity,
  });
}

export function createFindingCweMappedRelationship({
  findingEntity,
  cwe,
}: {
  findingEntity: Entity;
  cwe: string;
}): Relationship {
  return createMappedRelationship({
    _class: mappedRelationships.FINDING_EXPLOITS_CWE._class,
    _type: mappedRelationships.FINDING_EXPLOITS_CWE._type,
    source: findingEntity,
    target: {
      _type: mappedRelationships.FINDING_EXPLOITS_CWE.targetType,
      _key: cwe,
    },
    relationshipDirection: mappedRelationships.FINDING_EXPLOITS_CWE.direction,
  });
}

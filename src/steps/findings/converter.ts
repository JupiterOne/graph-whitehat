import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import generateKey from '../../../utils/generateKey';
import { WhitehatFinding } from '../../types';

import { Entities } from '../constants';

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
        firstOpened: data.firstOpened,
        opened: data.opened,
        closed: data.closed,
        lastModified: data.lastModified,
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

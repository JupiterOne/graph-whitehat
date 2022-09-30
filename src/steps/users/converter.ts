import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import generateKey from '../../../utils/generateKey';
import { WhitehatUser } from '../../types';

import { Entities } from '../constants';

export function createUserEntity(data: WhitehatUser): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: generateKey(Entities.USER._type, data.id),
        _type: Entities.USER._type,
        _class: Entities.USER._class,
        id: data.id.toString(),
        firstName: data.firstName,
        lastName: data.lastName,
        lastLoginOn: data.lastLogin,
        name: data.username,
        status: data.status,
        createdOn: data.createdDate,
        createdBy: data.createdBy || '',
        jobTitle: data.jobTitle,
        mobile: data.mobile,
        phone: data.phone,
        dataPrivacy: data.dataPrivacy,
        timezone: data.timezone,
        vulnEmails: data.vulnEmails,
        emailFrequencyDaily: data.emailFrequency.daily,
        emailFrequencyWeekly: data.emailFrequency.weekly,
        emailFrequencyMonthly: data.emailFrequency.monthly,
        active: data.status === 'Active',
      },
    },
  });
}

export function createAccountUserRelationship({
  accountEntity,
  userEntity,
}: {
  accountEntity: Entity;
  userEntity: Entity;
}): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: accountEntity,
    to: userEntity,
  });
}

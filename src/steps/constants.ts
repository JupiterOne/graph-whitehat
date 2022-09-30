import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const ACCOUNT_ENTITY_KEY = 'entity:account';
export const SERVICE_ENTITY_KEY = 'entity:service';

export const SCAN_TYPES = ['STATIC', 'DYNAMIC'];

export const Steps: Record<
  | 'ACCOUNT'
  | 'APP_SCANS'
  | 'ASSETS'
  | 'SITE_SCAN'
  | 'SERVICE'
  | 'USERS'
  | 'GROUPS'
  | 'ROLES',
  { id: string; name: string }
> = {
  ACCOUNT: {
    id: 'fetch-account',
    name: 'Fetch Account Details',
  },
  APP_SCANS: {
    id: 'fetch-application-scans',
    name: 'Fetch Application Scans',
  },
  SITE_SCAN: {
    id: 'fetch-site-scans',
    name: 'Fetch Site Scans',
  },
  ASSETS: {
    id: 'fetch-assets',
    name: 'Fetch Assets',
  },
  SERVICE: {
    id: 'fetch-service',
    name: 'Fetch Service',
  },
  USERS: {
    id: 'fetch-users',
    name: 'Fetch Users',
  },
  GROUPS: {
    id: 'fetch-groups',
    name: 'Fetch Groups',
  },
  ROLES: {
    id: 'fetch-roles',
    name: 'Fetch Roles',
  },
};

export const Entities: Record<
  | 'ACCOUNT'
  | 'APP_SCAN'
  | 'ASSET'
  | 'SITE_SCAN'
  | 'SERVICE'
  | 'USER'
  | 'GROUP'
  | 'ROLE',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'whitehat_account',
    _class: ['Account'],
  },
  APP_SCAN: {
    resourceName: 'Application Scan',
    _type: 'whitehat_app_scan',
    _class: ['Assessment'],
  },
  SITE_SCAN: {
    resourceName: 'Site Scan',
    _type: 'whitehat_site_scan',
    _class: ['Assessment'],
  },
  ASSET: {
    resourceName: 'Asset',
    _type: 'whitehat_asset',
    _class: ['Application'],
  },
  SERVICE: {
    resourceName: 'Scan Type',
    _type: 'whitehat_scan',
    _class: ['Service'],
  },
  USER: {
    resourceName: 'User',
    _type: 'whitehat_user',
    _class: ['User'],
  },
  GROUP: {
    resourceName: 'Group',
    _type: 'whitehat_group',
    _class: ['UserGroup'],
  },
  ROLE: {
    resourceName: 'Role',
    _type: 'whitehat_role',
    _class: ['AccessRole'],
  },
};

export const Relationships: Record<
  | 'ACCOUNT_HAS_ASSET'
  | 'APP_SCAN_SCANS_ASSET'
  | 'SITE_SCAN_SCANS_ASSET'
  | 'ACCOUNT_HAS_SERVICE'
  | 'ACCOUNT_HAS_USER'
  | 'GROUP_HAS_USER'
  | 'ACCOUNT_HAS_GROUP'
  | 'USER_ASSIGNED_ROLE'
  | 'SERVICE_PERFORMED_APP_SCAN'
  | 'SERVICE_PERFORMED_SITE_SCAN',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_ASSET: {
    _type: 'whitehat_account_has_asset',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.ASSET._type,
  },
  APP_SCAN_SCANS_ASSET: {
    _type: 'whitehat_app_scan_scans_asset',
    sourceType: Entities.APP_SCAN._type,
    _class: RelationshipClass.SCANS,
    targetType: Entities.ASSET._type,
  },
  SITE_SCAN_SCANS_ASSET: {
    _type: 'whitehat_site_scan_scans_asset',
    sourceType: Entities.SITE_SCAN._type,
    _class: RelationshipClass.SCANS,
    targetType: Entities.ASSET._type,
  },
  ACCOUNT_HAS_SERVICE: {
    _type: 'whitehat_account_has_scan',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.SERVICE._type,
  },
  SERVICE_PERFORMED_APP_SCAN: {
    _type: 'whitehat_scan_performed_app_scan',
    sourceType: Entities.SERVICE._type,
    _class: RelationshipClass.PERFORMED,
    targetType: Entities.APP_SCAN._type,
  },
  SERVICE_PERFORMED_SITE_SCAN: {
    _type: 'whitehat_scan_performed_site_scan',
    sourceType: Entities.SERVICE._type,
    _class: RelationshipClass.PERFORMED,
    targetType: Entities.SITE_SCAN._type,
  },
  ACCOUNT_HAS_USER: {
    _type: 'whitehat_account_has_user',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  GROUP_HAS_USER: {
    _type: 'whitehat_group_has_user',
    sourceType: Entities.GROUP._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  ACCOUNT_HAS_GROUP: {
    _type: 'whitehat_account_has_group',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.GROUP._type,
  },
  USER_ASSIGNED_ROLE: {
    _type: 'whitehat_user_assigned_role',
    sourceType: Entities.USER._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: Entities.ROLE._type,
  },
};

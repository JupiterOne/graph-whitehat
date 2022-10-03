import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const ACCOUNT_ENTITY_KEY = 'entity:account';
export const SERVICE_ENTITY_KEY = 'entity:service';

export const Steps: Record<
  | 'ACCOUNT'
  | 'ASSETS'
  | 'SERVICE'
  | 'SITES'
  | 'APPLICATION'
  | 'USERS'
  | 'GROUPS'
  | 'BUILD_USER_ROLE'
  | 'BUILD_USER_GROUP'
  | 'ROLES'
  | 'APP_ASSESSMENTS'
  | 'FINDINGS'
  | 'SITE_ASSESSMENTS',
  { id: string; name: string }
> = {
  ACCOUNT: {
    id: 'fetch-account',
    name: 'Fetch Account Details',
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
  SITES: {
    id: 'fetch-sites',
    name: 'Fetch Sites',
  },
  APPLICATION: {
    id: 'fetch-applications',
    name: 'Fetch Applications',
  },
  BUILD_USER_GROUP: {
    id: 'build-user-group-relationship',
    name: 'Build User and Group Relationship',
  },
  BUILD_USER_ROLE: {
    id: 'build-user-role-relationship',
    name: 'Build User and Role Relationship',
  },
  APP_ASSESSMENTS: {
    id: 'fetch-application-assessments',
    name: 'Fetch Application Assessments',
  },
  SITE_ASSESSMENTS: {
    id: 'fetch-site-assessments',
    name: 'Fetch Site Assessments',
  },
  FINDINGS: {
    id: 'fetch-findings',
    name: 'Fetch Findings',
  },
};

export const Entities: Record<
  | 'ACCOUNT'
  | 'ASSET'
  | 'SITE'
  | 'APPLICATION'
  | 'SERVICE'
  | 'USER'
  | 'ROLE'
  | 'FINDING'
  | 'GROUP'
  | 'ASSESSMENT',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'whitehat_account',
    _class: ['Account'],
  },
  ASSET: {
    resourceName: 'Asset',
    _type: 'whitehat_asset',
    _class: ['Application'],
  },
  SITE: {
    resourceName: 'Site',
    _type: 'web_app_domain',
    _class: ['Application', 'Host'],
  },
  APPLICATION: {
    resourceName: 'Application and Mobile Application',
    _type: 'whitehat_application',
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
  ASSESSMENT: {
    resourceName: 'Assessment',
    _type: 'whitehat_assessment',
    _class: ['Assessment'],
  },
  FINDING: {
    resourceName: 'Finding',
    _type: 'whitehat_finding',
    _class: ['Finding'],
  },
};

export const Relationships: Record<
  | 'ACCOUNT_HAS_ASSET'
  | 'ASSET_HAS_SITE'
  | 'ASSET_HAS_APPLICATION'
  | 'APPLICATION_HAS_ASSESSMENT'
  | 'APPLICATION_HAS_FINDING'
  | 'SITE_HAS_FINDING'
  | 'SITE_HAS_ASSESSMENT'
  | 'ACCOUNT_HAS_SERVICE'
  | 'ACCOUNT_HAS_USER'
  | 'GROUP_HAS_USER'
  | 'ACCOUNT_HAS_GROUP'
  | 'USER_ASSIGNED_ROLE'
  | 'ASSESSMENT_IDENTIFIED_FINDING'
  | 'SERVICE_PERFORMED_ASSESSMENT',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_ASSET: {
    _type: 'whitehat_account_has_asset',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.ASSET._type,
  },
  ASSET_HAS_SITE: {
    _type: 'whitehat_asset_has_web_app_domain',
    sourceType: Entities.ASSET._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.SITE._type,
  },
  ASSET_HAS_APPLICATION: {
    _type: 'whitehat_asset_has_application',
    sourceType: Entities.ASSET._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.APPLICATION._type,
  },
  SITE_HAS_ASSESSMENT: {
    _type: 'web_app_domain_has_whitehat_assessment',
    sourceType: Entities.SITE._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.ASSESSMENT._type,
  },
  APPLICATION_HAS_ASSESSMENT: {
    _type: 'whitehat_application_has_assessment',
    sourceType: Entities.APPLICATION._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.ASSESSMENT._type,
  },
  ACCOUNT_HAS_SERVICE: {
    _type: 'whitehat_account_has_scan',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.SERVICE._type,
  },
  SERVICE_PERFORMED_ASSESSMENT: {
    _type: 'whitehat_scan_performed_assessment',
    sourceType: Entities.SERVICE._type,
    _class: RelationshipClass.PERFORMED,
    targetType: Entities.ASSESSMENT._type,
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
  ASSESSMENT_IDENTIFIED_FINDING: {
    _type: 'whitehat_assessment_identified_finding',
    sourceType: Entities.ASSESSMENT._type,
    _class: RelationshipClass.IDENTIFIED,
    targetType: Entities.FINDING._type,
  },
  APPLICATION_HAS_FINDING: {
    _type: 'whitehat_application_has_finding',
    sourceType: Entities.APPLICATION._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.FINDING._type,
  },
  SITE_HAS_FINDING: {
    _type: 'web_app_domain_has_whitehat_finding',
    sourceType: Entities.SITE._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.FINDING._type,
  },
};

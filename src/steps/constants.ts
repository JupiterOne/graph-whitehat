import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';
import { WhitehatService } from '../types';

export const ACCOUNT_ENTITY_KEY = 'entity:account';

export const SERVICES: Record<'STATIC' | 'DYNAMIC', WhitehatService> = {
  STATIC: {
    _key: `whitehat-scan-static`,
    category: 'software',
    displayName: 'STATIC',
    name: 'STATIC',
    function: 'Vulnerability scanning',
  },
  DYNAMIC: {
    _key: `whitehat-scan-dynamic`,
    category: 'software',
    displayName: 'DYNAMIC',
    name: 'DYNAMIC',
    function: 'Vulnerability scanning',
  },
};

export const Steps: Record<
  'ACCOUNT' | 'APP_SCANS' | 'ASSETS' | 'SITE_SCAN' | 'SERVICES',
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
  SERVICES: {
    id: 'fetch-services',
    name: 'Fetch Services',
  },
};

export const Entities: Record<
  'ACCOUNT' | 'APP_SCAN' | 'ASSET' | 'SITE_SCAN' | 'SERVICE',
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
};

export const Relationships: Record<
  | 'ACCOUNT_HAS_ASSET'
  | 'APP_SCAN_SCANS_ASSET'
  | 'SITE_SCAN_SCANS_ASSET'
  | 'ACCOUNT_HAS_SERVICE',
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
};

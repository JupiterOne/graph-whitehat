import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const scanSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://localhost/api/v1/users
     * PATTERN: Fetch Entities
     */
    id: 'fetch-application-scans',
    name: 'Fetch Application Scans',
    entities: [
      {
        resourceName: 'Application Scan',
        _type: 'whitehat_app_scan',
        _class: ['Assessment'],
      },
    ],
    relationships: [
      {
        _type: 'whitehat_app_scan_scans_asset',
        sourceType: 'whitehat_app_scan',
        _class: RelationshipClass.SCANS,
        targetType: 'whitehat_asset',
      },
      {
        _type: 'whitehat_scan_performed_app_scan',
        sourceType: 'whitehat_scan',
        _class: RelationshipClass.PERFORMED,
        targetType: 'whitehat_app_scan',
      },
    ],
    dependsOn: ['fetch-assets', 'fetch-service'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: https://localhost/api/v1/users
     * PATTERN: Fetch Entities
     */
    id: 'fetch-site-scans',
    name: 'Fetch Site Scans',
    entities: [
      {
        resourceName: 'Site Scan',
        _type: 'whitehat_site_scan',
        _class: ['Assessment'],
      },
    ],
    relationships: [
      {
        _type: 'whitehat_site_scan_scans_asset',
        sourceType: 'whitehat_site_scan',
        _class: RelationshipClass.SCANS,
        targetType: 'whitehat_asset',
      },
      {
        _type: 'whitehat_scan_performed_site_scan',
        sourceType: 'whitehat_scan',
        _class: RelationshipClass.PERFORMED,
        targetType: 'whitehat_site_scan',
      },
    ],
    dependsOn: ['fetch-assets', 'fetch-service'],
    implemented: true,
  },
];

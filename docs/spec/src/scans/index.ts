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
    ],
    dependsOn: ['fetch-assets'],
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
    ],
    dependsOn: ['fetch-assets'],
    implemented: true,
  },
];

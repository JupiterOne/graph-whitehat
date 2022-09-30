import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const siteSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://localhost/api/v1/users
     * PATTERN: Fetch Entities
     */
    id: 'fetch-sites',
    name: 'Fetch Sites',
    entities: [
      {
        resourceName: 'Site',
        _type: 'web_app_domain',
        _class: ['Application', 'Host'],
      },
    ],
    relationships: [
      {
        _type: 'whitehat_asset_has_web_app_domain',
        sourceType: 'whitehat_asset',
        _class: RelationshipClass.HAS,
        targetType: 'web_app_domain',
      },
    ],
    dependsOn: ['fetch-assets'],
    implemented: true,
  },
];

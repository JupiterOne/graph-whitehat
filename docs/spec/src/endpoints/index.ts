import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const endpointSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://sentinel.whitehatsec.com/api/apiAssets/${siteId}/endpoints
     * PATTERN: Fetch Entities
     */
    id: 'fetch-endpoints',
    name: 'Fetch Endpoints',
    entities: [
      {
        resourceName: 'Endpoint',
        _type: 'web_app_endpoint',
        _class: ['ApplicationEndpoint'],
      },
    ],
    relationships: [
      {
        _type: 'web_app_domain_has_endpoint',
        sourceType: 'web_app_domain',
        _class: RelationshipClass.HAS,
        targetType: 'web_app_endpoint',
      },
    ],
    dependsOn: ['fetch-sites'],
    implemented: true,
  },
];

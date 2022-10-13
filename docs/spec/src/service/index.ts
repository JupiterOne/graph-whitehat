import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const serviceSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://sentinel.whitehatsec.com/api/eventSubscriptions
     * PATTERN: Fetch Entities
     */
    id: 'fetch-service',
    name: 'Fetch Service',
    entities: [
      {
        resourceName: 'Scan Type',
        _type: 'whitehat_scan',
        _class: ['Service'],
      },
    ],
    relationships: [
      {
        _type: 'whitehat_account_has_scan',
        sourceType: 'whitehat_account',
        _class: RelationshipClass.HAS,
        targetType: 'whitehat_scan',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];

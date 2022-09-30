import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const userSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Singleton
     */
    id: 'fetch-users',
    name: 'Fetch Users',
    entities: [
      {
        resourceName: 'User',
        _type: 'whitehat_user',
        _class: ['User'],
      },
    ],
    relationships: [
      {
        _type: 'whitehat_account_has_user',
        sourceType: 'whitehat_account',
        _class: RelationshipClass.HAS,
        targetType: 'whitehat_user',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];

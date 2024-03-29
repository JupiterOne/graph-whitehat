import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const groupSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://sentinel.whitehatsec.com/api/groups
     * PATTERN: Fetch Entities
     */
    id: 'fetch-groups',
    name: 'Fetch Groups',
    entities: [
      {
        resourceName: 'Group',
        _type: 'whitehat_group',
        _class: ['UserGroup'],
      },
    ],
    relationships: [
      {
        _type: 'whitehat_account_has_group',
        sourceType: 'whitehat_account',
        _class: RelationshipClass.HAS,
        targetType: 'whitehat_group',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: https://sentinel.whitehatsec.com/api/users
     * PATTERN: Fetch Entities
     */
    id: 'build-user-group-relationship',
    name: 'Build User and Group Relationship',
    entities: [],
    relationships: [
      {
        _type: 'whitehat_group_has_user',
        sourceType: 'whitehat_group',
        _class: RelationshipClass.HAS,
        targetType: 'whitehat_user',
      },
    ],
    dependsOn: ['fetch-groups', 'fetch-users'],
    implemented: true,
  },
];

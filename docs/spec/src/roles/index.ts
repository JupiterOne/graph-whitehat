import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const roleSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Singleton
     */
    id: 'fetch-roles',
    name: 'Fetch Roles',
    entities: [
      {
        resourceName: 'Role',
        _type: 'whitehat_role',
        _class: ['AccessRole'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Singleton
     */
    id: 'build-user-role-relationship',
    name: 'Build User and Role Relationship',
    entities: [],
    relationships: [
      {
        _type: 'whitehat_user_assigned_role',
        sourceType: 'whitehat_user',
        _class: RelationshipClass.ASSIGNED,
        targetType: 'whitehat_role',
      },
    ],
    dependsOn: ['fetch-users', 'fetch-roles'],
    implemented: true,
  },
];

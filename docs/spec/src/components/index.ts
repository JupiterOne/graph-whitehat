import {
  RelationshipClass,
  RelationshipDirection,
  StepSpec,
} from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const componentSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://localhost/api/v1/users
     * PATTERN: Fetch Entities
     */
    id: 'fetch-components',
    name: 'Fetch Components',
    entities: [
      {
        resourceName: 'Component',
        _type: 'whitehat_component',
        _class: ['CodeModule'],
      },
    ],
    relationships: [
      {
        _type: 'whitehat_application_has_component',
        sourceType: 'whitehat_application',
        _class: RelationshipClass.HAS,
        targetType: 'whitehat_component',
      },
    ],
    dependsOn: ['fetch-applications'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: https://localhost/api/v1/users
     * PATTERN: Fetch Entities
     */
    id: 'build-component-cve-relationship',
    name: 'Build Component and CVE Relationship',
    entities: [],
    relationships: [],
    mappedRelationships: [
      {
        _class: RelationshipClass.HAS,
        _type: 'whitehat_component_has_cve',
        direction: RelationshipDirection.FORWARD,
        sourceType: 'whitehat_component',
        targetType: 'cve',
      },
    ],
    dependsOn: ['fetch-components'],
    implemented: true,
  },
];

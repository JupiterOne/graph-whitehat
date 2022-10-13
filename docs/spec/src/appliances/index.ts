import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const applianceSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://sentinel.whitehatsec.com/api/appliances
     * PATTERN: Fetch Entities
     */
    id: 'fetch-appliances',
    name: 'Fetch Appliances',
    entities: [
      {
        resourceName: 'Appliance',
        _type: 'whitehat_appliance',
        _class: ['Gateway'],
      },
    ],
    relationships: [
      {
        _type: 'whitehat_account_has_appliance',
        sourceType: 'whitehat_account',
        _class: RelationshipClass.HAS,
        targetType: 'whitehat_appliance',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];

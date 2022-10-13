import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const assetSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://sentinel.whitehatsec.com/api/assets
     * PATTERN: Fetch Entities
     */
    id: 'fetch-assets',
    name: 'Fetch Assets',
    entities: [
      {
        resourceName: 'Asset',
        _type: 'whitehat_asset',
        _class: ['Application'],
      },
    ],
    relationships: [
      {
        _type: 'whitehat_account_has_asset',
        sourceType: 'whitehat_account',
        _class: RelationshipClass.HAS,
        targetType: 'whitehat_asset',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];

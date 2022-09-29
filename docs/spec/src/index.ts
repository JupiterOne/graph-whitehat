import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { assetSpec } from './assets';
import { accountSpec } from './account';
import { scanSpec } from './scans';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [...accountSpec, ...assetSpec, ...scanSpec],
};

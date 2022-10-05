import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { assetSpec } from './assets';
import { accountSpec } from './account';
import { scanSpec } from './scans';
import { serviceSpec } from './service';
import { userSpec } from './users';
import { groupSpec } from './groups';
import { roleSpec } from './roles';
import { siteSpec } from './sites';
import { applicationSpec } from './application';
import { findingSpec } from './findings';
import { applianceSpec } from './appliances';
import { endpointSpec } from './endpoints';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [
    ...accountSpec,
    ...assetSpec,
    ...scanSpec,
    ...serviceSpec,
    ...userSpec,
    ...groupSpec,
    ...roleSpec,
    ...siteSpec,
    ...applicationSpec,
    ...findingSpec,
    ...applianceSpec,
    ...endpointSpec,
  ],
};

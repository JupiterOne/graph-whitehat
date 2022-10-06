import { accountSteps } from './account';
import { applianceSteps } from './appliances';
import { applicationSteps } from './applications';
import { assetSteps } from './assets';
import { componentSteps } from './components';
import { endpointSteps } from './endpoints';
import { findingSteps } from './findings';
import { groupSteps } from './groups';
import { roleSteps } from './roles';
import { scanSteps } from './scan';
import { serviceSteps } from './service';
import { siteSteps } from './sites';
import { userSteps } from './users';

const integrationSteps = [
  ...accountSteps,
  ...userSteps,
  ...assetSteps,
  ...scanSteps,
  ...serviceSteps,
  ...groupSteps,
  ...roleSteps,
  ...siteSteps,
  ...applicationSteps,
  ...findingSteps,
  ...applianceSteps,
  ...endpointSteps,
  ...componentSteps,
];

export { integrationSteps };

import { accountSteps } from './account';
import { applicationSteps } from './applications';
import { assetSteps } from './assets';
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
];

export { integrationSteps };

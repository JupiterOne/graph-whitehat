import { accountSteps } from './account';
import { assetSteps } from './assets';
import { groupSteps } from './groups';
import { roleSteps } from './roles';
import { scanSteps } from './scan';
import { serviceSteps } from './service';
import { userSteps } from './users';

const integrationSteps = [
  ...accountSteps,
  ...userSteps,
  ...assetSteps,
  ...scanSteps,
  ...serviceSteps,
  ...groupSteps,
  ...roleSteps,
];

export { integrationSteps };

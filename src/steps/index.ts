import { accountSteps } from './account';
import { assetSteps } from './assets';
import { scanSteps } from './scan';
import { serviceSteps } from './service';
import { userSteps } from './users';

const integrationSteps = [
  ...accountSteps,
  ...userSteps,
  ...assetSteps,
  ...scanSteps,
  ...serviceSteps,
];

export { integrationSteps };

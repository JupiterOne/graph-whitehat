import { accountSteps } from './account';
import { assetSteps } from './assets';
import { scanSteps } from './scan';
import { serviceSteps } from './service';

const integrationSteps = [
  ...accountSteps,
  ...assetSteps,
  ...scanSteps,
  ...serviceSteps,
];

export { integrationSteps };

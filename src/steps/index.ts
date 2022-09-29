import { accountSteps } from './account';
import { assetSteps } from './assets';
import { scanSteps } from './scan';

const integrationSteps = [...accountSteps, ...assetSteps, ...scanSteps];

export { integrationSteps };

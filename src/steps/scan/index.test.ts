import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test('fetch-application-scans', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-application-scans',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.APP_SCANS.id);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

test('fetch-site-scans', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-site-scans',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.SITE_SCAN.id);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

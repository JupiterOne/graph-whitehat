import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test.skip('fetch-application-assessments', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-application-assessments',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.APP_ASSESSMENTS.id);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

test.skip('fetch-site-assessments', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-site-assessments',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.SITE_ASSESSMENTS.id);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

// Temporary: No endpoint license available to populate data
test.skip('fetch-endpoints', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-endpoints',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.ENDPOINTS.id);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

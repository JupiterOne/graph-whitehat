import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test('fetch-applications', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-applications',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.APPLICATION.id);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

test('fetch-codebases', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-codebases',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.CODEBASES.id);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

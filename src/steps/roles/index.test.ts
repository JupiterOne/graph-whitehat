import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test('fetch-account', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-account',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.ACCOUNT.id);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

test('build-role-user-relationship', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'build-role-user-relationship',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.BUILD_USER_ROLE.id);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

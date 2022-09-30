import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test('fetch-groups', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-groups',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.GROUPS.id);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

test('build-user-group-relationship', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'build-user-group-relationship',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.BUILD_USER_GROUP.id);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

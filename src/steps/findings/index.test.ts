import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test('fetch-findings', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-findings',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.FINDINGS.id);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

test('build-finding-scan-relationship', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'build-finding-scan-relationship',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.BUILD_FINDING_SCAN.id);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test('fetch-components', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-components',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.COMPONENTS.id);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

test('build-component-cve-relationship', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'build-component-cve-relationship',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.BUILD_COMPONENT_CVE.id);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(
    stepResult.collectedRelationships.some(
      (r) => r._type === 'whitehat_component_has_cve',
    ),
  ).toBe(true);
});

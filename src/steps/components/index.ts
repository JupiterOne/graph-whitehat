import {
  IntegrationStep,
  IntegrationStepExecutionContext,
  getRawData,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import { WhitehatApplication, WhitehatComponent } from '../../types';
import {
  Steps,
  Entities,
  Relationships,
  mappedRelationships,
} from '../constants';
import {
  createApplicationComponentRelationship,
  createComponentCveMappedRelationship,
  createComponentEntity,
} from './converter';

export async function fetchComponents({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.APPLICATION._type },
    async (applicationEntity) => {
      const application = getRawData<WhitehatApplication>(applicationEntity);

      if (!application)
        logger.warn(
          `Can not get raw data for application entity: ${applicationEntity._key}`,
        );
      else {
        await apiClient.iterateComponents(async (component) => {
          const componentEntity = await jobState.addEntity(
            createComponentEntity(component),
          );

          await jobState.addRelationship(
            createApplicationComponentRelationship({
              applicationEntity,
              componentEntity,
            }),
          );
        }, application.id);
      }
    },
  );
}

export async function buildComponentCveRelationship({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.COMPONENT._type },
    async (componentEntity) => {
      const component = getRawData<WhitehatComponent>(componentEntity);

      if (!component)
        logger.warn(
          `Can not get raw data for component entity: ${componentEntity._key}`,
        );
      else {
        if (component.cves.length > 0)
          for (const { name } of component.cves)
            await jobState.addRelationship(
              createComponentCveMappedRelationship({
                componentEntity,
                cve: name.toLowerCase(),
              }),
            );
      }
    },
  );
}

export const componentSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.COMPONENTS.id,
    name: Steps.COMPONENTS.name,
    entities: [Entities.COMPONENT],
    relationships: [Relationships.APPLICATION_HAS_COMPONENT],
    dependsOn: [Steps.APPLICATION.id],
    executionHandler: fetchComponents,
  },
  {
    id: Steps.BUILD_COMPONENT_CVE.id,
    name: Steps.BUILD_COMPONENT_CVE.name,
    entities: [],
    relationships: [],
    mappedRelationships: [mappedRelationships.COMPONENT_HAS_CVE],
    dependsOn: [Steps.COMPONENTS.id],
    executionHandler: buildComponentCveRelationship,
  },
];

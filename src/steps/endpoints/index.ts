import {
  IntegrationStep,
  IntegrationStepExecutionContext,
  getRawData,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { WhitehatSite } from '../../types';
import { Steps, Entities, Relationships } from '../constants';
import {
  createEndpointEntity,
  createSiteEndpointRelationship,
} from './converter';

export async function fetchEndpoints({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.SITE._type },
    async (siteEntity) => {
      const site = getRawData<WhitehatSite>(siteEntity);
      if (!site) {
        logger.warn(
          { _key: siteEntity._key },
          'Could not get raw data for site entity',
        );
        return;
      }

      const endpoint = await apiClient.getEndpoint(site.id);
      if (Object.keys(endpoint).length > 0) {
        const endpointEntity = await jobState.addEntity(
          createEndpointEntity(endpoint),
        );

        await jobState.addRelationship(
          createSiteEndpointRelationship({ siteEntity, endpointEntity }),
        );
      }
    },
  );
}

export const endpointSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ENDPOINTS.id,
    name: Steps.ENDPOINTS.name,
    entities: [Entities.ENDPOINT],
    relationships: [Relationships.SITE_HAS_ENDPOINT],
    dependsOn: [Steps.SITES.id],
    executionHandler: fetchEndpoints,
  },
];

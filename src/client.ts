import fetch, { Response } from 'node-fetch';
import { retry } from '@lifeomic/attempt';

import {
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from './config';
import {
  WhitehatAppScan,
  WhitehatAsset,
  WhitehatEventSubscriptionsResponse,
  WhitehatSiteScan,
  WhitehatCurrentUser,
  WhitehatUser,
  WhitehatGroup,
  WhitehatRoleResponse,
  WhitehatSite,
  WhitehatApplication,
  WhitehatFinding,
} from './types';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

/**
 * An APIClient maintains authentication state and provides an interface to
 * third party data APIs.
 *
 * It is recommended that integrations wrap provider data APIs to provide a
 * place to handle error responses and implement common patterns for iterating
 * resources.
 */
export class APIClient {
  constructor(readonly config: IntegrationConfig) {}

  private baseUri = `https://sentinel.whitehatsec.com/api`;
  private withBaseUri = (path: string) => `${this.baseUri}${path}`;
  private limit: number = 50;

  private checkStatus = (response: Response) => {
    if (response.ok) {
      return response;
    } else {
      throw new IntegrationProviderAPIError(response);
    }
  };

  private async request(uri: string, method?: 'GET'): Promise<Response> {
    try {
      const options = {
        method,
        headers: {
          Key: this.config.whitehatApiKey,
          accept: 'application/json',
        },
      };

      // Handle rate-limiting
      const response = await retry(
        async () => {
          const res: Response = await fetch(uri, options);
          this.checkStatus(res);
          return res;
        },
        {
          delay: 5000,
          maxAttempts: 10,
          handleError: (err, context) => {
            if (
              err.statusCode !== 429 ||
              ([500, 502, 503].includes(err.statusCode) &&
                context.attemptNum > 1)
            )
              context.abort();
          },
        },
      );

      return response.json();
    } catch (err) {
      throw new IntegrationProviderAPIError({
        endpoint: uri,
        status: err.status || err.type,
        statusText: err.statusText || err.code,
      });
    }
  }

  private async paginatedRequest<T>(
    uri: string,
    iteratee: ResourceIteratee<T>,
    query?: string,
    method?: 'GET',
  ): Promise<void> {
    try {
      let offset = 0;
      let response: Response;
      let count = 0;
      do {
        response = await this.request(
          `${uri}?limit=${this.limit}&offset=${offset}${query ? query : ''}`,
          method,
        );

        for (const resource of response.collection) await iteratee(resource);
        offset += this.limit;

        count =
          (query && response.page.filteredCount) !== undefined
            ? response.page.filteredCount
            : response.page.totalCount;
      } while (count > offset);
    } catch (err) {
      throw new IntegrationProviderAPIError({
        cause: new Error(err.message),
        endpoint: uri,
        status: err.statusCode,
        statusText: err.message,
      });
    }
  }

  public async verifyAuthentication(): Promise<void> {
    const uri = this.withBaseUri('/whoami');
    try {
      await this.request(uri);
    } catch (err) {
      throw new IntegrationProviderAuthenticationError({
        cause: err,
        endpoint: uri,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  public async iterateApplicationScans(
    appId: number,
    iteratee: ResourceIteratee<WhitehatAppScan>,
  ): Promise<void> {
    return this.paginatedRequest<WhitehatAppScan>(
      this.withBaseUri(`/sourceApplications/${appId}/scans`),
      iteratee,
    );
  }

  public async iterateAssets(
    iteratee: ResourceIteratee<WhitehatAsset>,
  ): Promise<void> {
    return this.paginatedRequest<WhitehatAsset>(
      this.withBaseUri('/assets'),
      iteratee,
    );
  }

  public async iterateFindings(
    iteratee: ResourceIteratee<WhitehatFinding>,
    query?: string,
  ): Promise<void> {
    return this.paginatedRequest<WhitehatFinding>(
      this.withBaseUri(`/findings`),
      iteratee,
      query,
    );
  }

  public async iterateGroups(
    iteratee: ResourceIteratee<WhitehatGroup>,
  ): Promise<void> {
    return this.paginatedRequest<WhitehatGroup>(
      this.withBaseUri(`/groups`),
      iteratee,
    );
  }

  public async iterateUsers(
    iteratee: ResourceIteratee<WhitehatUser>,
    query?: string,
  ): Promise<void> {
    return this.paginatedRequest<WhitehatUser>(
      this.withBaseUri(`/users`),
      iteratee,
      query,
    );
  }

  public async getApplication(
    applicationId: number,
  ): Promise<WhitehatApplication> {
    return this.request(this.withBaseUri(`/application/${applicationId}`));
  }

  public async getCurrentUser(): Promise<WhitehatCurrentUser> {
    return this.request(this.withBaseUri('/whoami'));
  }

  public async getEventSubscriptions(): Promise<WhitehatEventSubscriptionsResponse> {
    return this.request(this.withBaseUri(`/eventSubscriptions`));
  }

  public async getRoles(): Promise<WhitehatRoleResponse> {
    return this.request(this.withBaseUri(`/userRoles`));
  }

  public async getSite(siteId: number): Promise<WhitehatSite> {
    return this.request(this.withBaseUri(`/v2/sites/${siteId}`));
  }

  public async getSiteScans(siteId: number): Promise<WhitehatSiteScan> {
    return this.request(
      this.withBaseUri(`/site/${siteId}/last_completed_scans`),
    );
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}

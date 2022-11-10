import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import generateKey from '../../utils/generateKey';
import { WhitehatCurrentUser } from '../../types';
import { Entities } from '../constants';

export function createAccountEntity(data: WhitehatCurrentUser): Entity {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: generateKey(Entities.ACCOUNT._type, data.id),
        _type: Entities.ACCOUNT._type,
        _class: Entities.ACCOUNT._class,
        id: data.id.toString(),
        username: data.username,
        name: data.username,
        isAdmin: data.isAdmin,
        privileges: data.privileges,
        hasJumped: data.hasJumped,
        primaryClient: data.primaryClient,
        allSitesAdmin: data.allSitesAdmin,
        hasAssets: data.hasAssets,
      },
    },
  });
}

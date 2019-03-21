import { inject, injectable } from 'inversify';
import { IDataAccessProvider, IEntityDao } from '../../DataAccessLayer/DataAccess.Face';
import { AccessDeniedException, ArgumentNullException } from '../../Exceptions';
import { IEntity } from '../../Model';
import { TYPES } from '../../types';
import { IService } from '../Services.Face';

@injectable()
export class BaseService {

  /**
   * Data access provider
   */
  protected provider: IDataAccessProvider;

  constructor(@inject(TYPES.IDataAccessProvider) provider) {
    if (provider === null || provider === undefined) {
      throw new ArgumentNullException('provider');
    }
    this.provider = provider;
  }

  /**
   * Return data access object for entity
   */
  protected dao<TEntity extends IEntity>(): IEntityDao<TEntity> {
    return this.provider.getEntityDao<TEntity>();
  }

  /**
   * Return service
   * @param serviceIdentifier - service identifier in container
   */
  protected service<TService extends IService>(serviceIdentifier: string): TService {
    return this.provider.getService<TService>(serviceIdentifier) as TService;
  }

  /**
   * Checks if the current user has permission to perform an action.
   * @param customPermissionCode
   */
  protected async checkPermission(customPermissionCode: string): Promise<boolean> {
    return true;
  }

  /**
   * Checks if the current user has permission to perform an action.
   * @constructor
   */
  protected async verifyPermission(customPermissionCode: string): Promise<void> {
    const result: boolean = await this.checkPermission(customPermissionCode);
    if (!result) {
      throw new AccessDeniedException('You do not have enough rights to perform the action');
    }
  }
}

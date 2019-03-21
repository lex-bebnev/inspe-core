import { IEntity } from '../../Model/Entities.Base.Face';
import { IService } from '../../Services';
import { IDataPersister } from './IDataPersister';
import { IEntityDao } from './IEntityDao';

/**
 * Data access provider
 */
export interface IDataAccessProvider extends IDataPersister {
  /**
   * Return IEntityDao for TEntity type
   */
  getEntityDao<TEntity extends IEntity>(type: (new () => TEntity)): IEntityDao<TEntity>;

  /**
   * Return service instance type {TService}
   * @param type - service type
   */
  getService<TService>(type: (new () => TService)): IService;
}

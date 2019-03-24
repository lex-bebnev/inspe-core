import { IEntity } from '../../Model/Entities.Base.Face';
import { IDataAccessProvider } from './IDataAccessProvider';
import { IQuery } from './Querying';

/**
 * Properties and methods description the standard data access object
 */
export interface IEntityDao<TEntity extends IEntity> {
  /**
   * Data access provider
   */
  provider: IDataAccessProvider;

  /**
   * Select entity by ID
   * @param type
   * @param id
   */
  select<TEntity extends IEntity>(type: (new () => TEntity), id?: any): Promise<TEntity>;

  /**
   * Select all entities
   * @param type
   * @param id
   * @param query
   */
  select<TEntity extends IEntity>(type: (new () => TEntity), id?: any, query?: IQuery): Promise<TEntity[]>;

  /**
   * Save new entity
   * @param entity
   */
  save<TEntity extends IEntity>(entity: TEntity): Promise<TEntity>;

  /**
   * Delete entity
   * @param entity
   */
  delete<TEntity extends IEntity>(entity: TEntity): Promise<void>;

  /**
   * Return count of entities
   * @param type - entity type
   */
  count<TEntity extends IEntity>(type: (new () => TEntity)): Promise<number>;
}

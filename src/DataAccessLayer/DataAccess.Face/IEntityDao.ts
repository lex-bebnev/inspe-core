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
  select(type: (new () => TEntity), id?: any): Promise<TEntity>;

  /**
   * Select all entities
   * @param type
   * @param id
   * @param query
   */
  select(type: (new () => TEntity), id?: any, query?: IQuery): Promise<TEntity[]>;

  /**
   * Save new entity
   * @param type
   * @param entity
   */
  save(type: (new () => TEntity), entity: TEntity): Promise<TEntity>;

  /**
   * Delete entity
   * @param type
   * @param entity
   */
  delete(type: (new () => TEntity), entity: TEntity): Promise<void>;

  /**
   * Return count of entities
   * @param type - entity type
   */
  count(type: (new () => TEntity)): Promise<number>;
}

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
   * @param id
   */
  select(id?: any): Promise<TEntity>;

  /**
   * Select all entities
   */
  select(id?: any, query?: IQuery): Promise<TEntity[]>;

  /**
   * Save new entity
   * @param entity
   */
  save(entity: TEntity): Promise<TEntity>;

  /**
   * Delete entity
   * @param entity
   */
  delete(entity: TEntity): Promise<void>;
}

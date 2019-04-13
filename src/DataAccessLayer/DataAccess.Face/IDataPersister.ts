import { IEntity } from '../../Model/Entities.Base.Face';
import { IFilter, IQuery } from './Querying';

/**
 * Provides direct access to the database and data manipulation
 */
export interface IDataPersister {

  /**
   * Read Only Data Accessibility Mark
   */
  readonly isReadOnly: boolean;
  /**
   * Save entity
   * @param type
   * @param entity - Saving entity
   */
  save<TEntity extends IEntity>(type: (new () => TEntity), entity: TEntity): Promise<TEntity>;

  /**
   * Delete entity
   * @param type - entity type
   * @param entity - entity
   */
  delete<TEntity extends IEntity>(type: (new () => TEntity), entity: TEntity): Promise<void>;

  /**
   * Get entity by id
   * @param type - Entity type identifier
   * @param id - Entity identifier
   * @param query - Full entity selection condition
   */
  get<TEntity extends IEntity>(type: (new () => TEntity), id?: any, query?: IQuery): Promise<TEntity | TEntity[]>;

  /**
   * Returns the number of objects selected by conditions.
   * @param type - Entity type
   * @param filter - List of selection conditions
   */
  count<TEntity extends IEntity>(type: (new () => TEntity), filter: IFilter): Promise<number>;

  /**
   * Commit transaction
   */
  commit(): Promise<void>;

  /**
   * Rollback transaction
   */
  rollback(): Promise<void>;
}

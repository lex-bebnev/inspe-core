import { inject, injectable } from 'inversify';
import { ArgumentNullException } from '../../Exceptions';
import { IEntity } from '../../Model/Entities.Base.Face';
import { TYPES } from '../../types';
import { IDataAccessProvider, IEntityDao, IQuery } from '../DataAccess.Face';

/**
 * Properties and methods description the standard data access object
 */
@injectable()
export class EntityDao<TEntity extends IEntity> implements IEntityDao<TEntity> {

  public provider: IDataAccessProvider;

  /**
   * Create a new instance of EntityDao
   * @param provider - Data access provider
   */
  constructor(@inject(TYPES.IDataAccessProvider) provider: IDataAccessProvider) {
    if (provider === null || provider === undefined) {
      throw new ArgumentNullException('provider');
    }
    this.provider = provider;
  }

  /**
   * Delete entity
   * @param type
   * @param {TEntity} entity - Deleted entity
   * @throws {ArgumentNullException} {entity} = null
   * @throws {ArgumentNullException} {type} = null
   */
  public async delete<TEntity extends IEntity>(type: (new () => TEntity), entity: TEntity): Promise<void> {
    if (type === null || type === undefined) {
      throw new ArgumentNullException('type');
    }
    if (entity === null || entity === undefined) {
      throw new ArgumentNullException('entity');
    }
    await this.provider.delete<TEntity>(type, entity);
  }

  /**
   * Save entity
   * @param entity - Saved entity
   * @throws {ArgumentNullException} {entity} === null
   */
  public async save<TEntity extends IEntity>(entity: TEntity): Promise<TEntity> {
    if (entity === null || entity === undefined) {
      throw new ArgumentNullException('entity');
    }
    return await this.provider.save<TEntity>(entity);
  }

  /**
   * Select entity
   * @param type - Entity type
   * @param id - entity id
   * @throws {ArgumentNullException} type === null
   */
  public async select<TEntity extends IEntity>(type: (new () => TEntity), id: any): Promise<TEntity>;
  public async select<TEntity extends IEntity>(type: (new () => TEntity)): Promise<TEntity[]>;
  public async select<TEntity extends IEntity>(type: (new () => TEntity), id?: any, query?: IQuery): Promise<any> {
    if (type === null || type === undefined) {
      throw new ArgumentNullException('type');
    }
    return await this.provider.get<TEntity>(type, id, query);
  }

  /**
   * Return count of entities
   * @param type - entity type
   */
  public async count<TEntity extends IEntity>(type: { new(): TEntity }): Promise<number> {
    if (type === null || type === undefined) {
      throw new ArgumentNullException('type');
    }
    return await this.provider.count(type, null); // TODO Add empty filter
  }
}

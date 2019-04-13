import { inject, injectable } from 'inversify';
import { ArgumentNullException, NotImplementedException } from '../../Exceptions';
import { baseResolver } from '../../inversify.config';
import { IEntity } from '../../Model/Entities.Base.Face';
import { TYPES } from '../../types';
import { IDataAccessProvider, IDataPersister, IEntityDao, IFilter, IQuery } from '../DataAccess.Face';

@injectable()
export class DataAccessProvider implements IDataAccessProvider {

  public readonly isReadOnly: boolean;
  private dataPersister: IDataPersister;

  /**
   * Initialize new instance of DataAccessProvider
   * @param dataPersister
   * @throws {ArgumentNullException} dataPersisiter = null
   */
  public constructor(@inject(TYPES.IDataPersister) dataPersister: IDataPersister) {
    if (dataPersister === null || dataPersister === undefined) {
      throw new ArgumentNullException('dataPersister');
    }
    this.dataPersister = dataPersister;
  }

  /**
   * Delete entity
   * @param type - entity type
   * @param entity - entity
   */
  public async delete<TEntity extends IEntity>(type: (new () => TEntity), entity: TEntity): Promise<void> {
    if (entity === null || entity === undefined) {
      throw new ArgumentNullException('entity');
    }
    await this.dataPersister.delete(type, entity);
  }

  /**
   * Get entity by id
   * @param type - Entity type
   * @param id - Entity identificator
   * @param query - Full entity selection condition
   */
  public async get<TEntity  extends IEntity>(type: (new () => TEntity), id?: any, query?: IQuery): Promise<TEntity | TEntity[]> {
    if (type === null || type === undefined) {
      throw new ArgumentNullException('type');
    }
    return await this.dataPersister.get<TEntity>(type, id, query);
  }

  /**
   * Save entity
   * @param type
   * @param entity - Saving entity
   */
  public async save<TEntity extends IEntity>(type: (new () => TEntity), entity: TEntity): Promise<TEntity> {
    if (entity === null || entity === undefined) {
      throw new ArgumentNullException('entity');
    }
    return await this.dataPersister.save<TEntity>(type, entity);
  }

  /**
   * Commit transaction
   */
  public async commit(): Promise<void> {
    throw new NotImplementedException();
  }

  /**
   * Returns the number of objects selected by conditions.
   * @param type - Entity type
   * @param filter - List of selection conditions
   */
  public async count<TEntity extends IEntity>(type: (new () => TEntity), filter: IFilter): Promise<number> {
    if (type === null || type === undefined) {
      throw new ArgumentNullException('type');
    }
    /*if (filter === null || filter === undefined) {
      throw new ArgumentNullException('filter');
    }*/ // TODO After add empty filter uncomment
    return await this.dataPersister.count(type, filter);
  }

  /**
   * Rollback transaction
   */
  public async rollback(): Promise<void> {
    throw new NotImplementedException();
  }

  /**
   * Return IEntityDao for TEntity type
   * @param type - Entity type
   */
  public getEntityDao<TEntity extends IEntity>(type: (new () => TEntity)): IEntityDao<TEntity> {
    if (type === null || type === undefined) {
      throw new ArgumentNullException('type');
    }
    const dao: IEntityDao<TEntity> = baseResolver.getNamedOrDefault<IEntityDao<TEntity>>(TYPES.IEntityDao, type.name);
    dao.provider = this; // TODO Костыль, разобраться можно ли оверрайдить инжектируемые свойства объектами из текущего контекста
    return dao;
  }

  /**
   * Return service instance type {TService}
   * @param type - Service type
   */
  public getService<TService>(type: (new () => TService)): TService {
    if (type === null || type === undefined) {
      throw new ArgumentNullException('type');
    }
    return baseResolver.getNamedOrDefault<TService>(TYPES.IService, type.name);
  }
}

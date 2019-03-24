import { inject, injectable } from 'inversify';
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
   */
  public constructor(@inject(TYPES.IDataPersister) dataPersister: IDataPersister) {
    this.dataPersister = dataPersister;
  }

  /**
   * Delete entity
   * @param entity - entity
   */
  public async delete<TEntity extends IEntity>(entity: TEntity): Promise<void> {
    await this.dataPersister.delete(entity);
  }

  /**
   * Get entity by id
   * @param type - Entity type
   * @param id - Entity identificator
   * @param query - Full entity selection condition
   */
  public async get<TEntity  extends IEntity>(type: (new () => TEntity), id?: any, query?: IQuery): Promise<TEntity | TEntity[]> {
    return await this.dataPersister.get<TEntity>(type, id, query);
  }

  /**
   * Save entity
   * @param entity - Saving entity
   */
  public async save<TEntity extends IEntity>(entity: TEntity): Promise<TEntity> {
    return await this.dataPersister.save<TEntity>(entity);
  }

  /**
   * Commit transaction
   */
  public async commit(): Promise<void> {
    return undefined;
  }

  /**
   * Returns the number of objects selected by conditions.
   * @param type - Entity type
   * @param filter - List of selection conditions
   */
  public async count<TEntity extends IEntity>(type: (new () => TEntity), filter: IFilter): Promise<number> {
    return await this.dataPersister.count(type, filter);
  }

  /**
   * Rollback transaction
   */
  public async rollback(): Promise<void> {
    return undefined;
  }

  /**
   * Return IEntityDao for TEntity type
   * @param type - Entity type
   */
  public getEntityDao<TEntity extends IEntity>(type: (new () => TEntity)): IEntityDao<TEntity> {
    const dao: IEntityDao<TEntity> = baseResolver.getNamedOrDefault<IEntityDao<TEntity>>(TYPES.IEntityDao, type.name);
    dao.provider = this; // TODO Костыль, разобраться можно ли оверрайдить инжектируемые свойства объектами из текущего контекста
    return dao;
  }

  /**
   * Return service instance type {TService}
   * @param type - Service type
   */
  public getService<TService>(type: (new () => TService)): TService {
    return baseResolver.getNamedOrDefault<TService>(TYPES.IService, type.name);
  }
}

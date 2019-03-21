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
   * @param id - Entity identificator
   * @param query - Full entity selection condition
   */
  public async get<TEntity  extends IEntity>(id?: any, query?: IQuery): Promise<TEntity | TEntity[]> {
    return await this.dataPersister.get<TEntity>(id, query);
  }

  /**
   * Save entity
   * @param entity - Saving entity
   */
  public async save<TEntity extends IEntity>(entity: TEntity): Promise<TEntity> {
    return await this.dataPersister.save(entity);
  }

  /**
   * Commit transaction
   */
  public async commit(): Promise<void> {
    return undefined;
  }

  /**
   * Returns the number of objects selected by conditions.
   * @param filter - List of selection conditions
   */
  public async count<TEntity extends IEntity>(filter: IFilter): Promise<number> {
    return undefined;
  }

  /**
   * Rollback transaction
   */
  public async rollback(): Promise<void> {
    return undefined;
  }

  /**
   * Return IEntityDao for TEntity type
   */
  public getEntityDao<TEntity extends IEntity>(): IEntityDao<TEntity> {
    const dao: IEntityDao<TEntity> = baseResolver.get<IEntityDao<TEntity>>(TYPES.IEntityDao);
    dao.provider = this; // TODO Костыль, разобраться можно ли оверрайдить инжектируемые свойства объектами из текущего контекста
    return dao;
  }

  /**
   * Return service instance type {TService}
   * @param serviceIdentifier - Identifier in DI container
   */
  public getService<TService>(serviceIdentifier: string): TService {
    return baseResolver.get<TService>(serviceIdentifier);
  }
}

import { injectable } from 'inversify';
import { Connection, createConnection, createQueryBuilder, EntitySchema, FindManyOptions, getManager, SelectQueryBuilder } from 'typeorm';
import { ArgumentNullException, ArgumentOutOfRangeException, NotImplementedException } from '../../../../Exceptions';
import { isNullOrUndefined } from '../../../../Helpers';
import { baseResolver } from '../../../../inversify.config';
import { IEntity } from '../../../../Model';
import { TYPES } from '../../../../types';
import { DALException } from '../../../DataAccess.Common';
import { IDataPersister, IFilter, IQuery, ISorter } from '../../../DataAccess.Face';
import { FilterHelper } from '../../QueryBuilderHelpers/FilterHelper';
import { SorterHelper } from '../../QueryBuilderHelpers/SorterHelper';

/**
 * Implements the basics methods of working with DataBase
 */
@injectable()
export class TypeOrmDataPersister implements IDataPersister {

  /**
   * Is Data persister already connected
   */
  protected isConnected: boolean;

  /**
   * TypeORM connection
   */
  protected connection: Connection; // Useless abstractions?

  /**
   * Read Only Data Accessibility Mark
   */
  public readonly isReadOnly: boolean = false;

  /**
   * Connect to DB
   */
  public async connect(): Promise<void> {
    if (this.isConnected) {
      throw new DALException('Data Persister Connect Multiply Connections Are Not Supported');
    }
    this.isConnected = true;
    this.connection = await createConnection();
  }

  /**
   * Delete entity
   * @param entity
   */
  public async delete<TEntity extends IEntity>(entity: TEntity): Promise<void> {
    throw new NotImplementedException('Not implemented in TypeORM Data Persisiter');
  }
  protected async softDelete<TEntity extends IEntity>(entity: TEntity): Promise<void> {
    throw new NotImplementedException('Not implemented in TypeORM Data Persisiter');
  }
  protected async physicalDelete<TEntity extends IEntity>(entity: TEntity): Promise<void> {
    throw new NotImplementedException('Not implemented in TypeORM Data Persisiter');
  }

  /**
   * Returns a batch of entities or one entity selected by condition and sorted.
   * @param type - entity type
   * @param id - Entity id
   * @param query - Full entity selection condition
   * @throws {<ArgumentNullException>} {query} = null | undefined
   * @throws {<ArgumentOutOfRangeException>} {query.skip} < 0
   * @throws {<ArgumentOutOfRangeException>} {query.take} < 0
   * @return Filtered list of entities or entity by id
   */
  public async get<TEntity extends IEntity>(type: (new () => TEntity), id?: number , query?: IQuery): Promise<TEntity | TEntity[]> {
    await this.checkConnection();
    const entitySchema: EntitySchema<TEntity> = baseResolver.getNamedOrDefault<EntitySchema<TEntity>>(TYPES.IEntityMapping, type.name);
    if (!isNullOrUndefined(id)) {
      return await getManager().findOne(entitySchema, id);
    }
    if (isNullOrUndefined(query)) {
      throw new ArgumentNullException('query');
    }

    // TODO Добавить проверку на максимально допустимое значение параметров
    if (!isNullOrUndefined(query.skip)) {
      if (query.skip < 0) {
        throw new ArgumentOutOfRangeException('Number of skip entities can\'t be less than 0');
      }
    }

    if (!isNullOrUndefined(query.take)) {
      if (query.take < 0) {
        throw new ArgumentOutOfRangeException('Number of skip entities can\'t be less than 0');
      }
    }

    const findOptions: FindManyOptions<TEntity> = this.getOptions<TEntity>(query.skip, query.take, query.filter, query.sorter);
    return await getManager().find(entitySchema, findOptions);
  }

  /**
   * Save entity
   * @param entity
   */
  public async save<TEntity extends IEntity>(entity: TEntity): Promise<TEntity> {
    if (isNullOrUndefined(entity)) {
      throw new ArgumentNullException('entity');
    }
    await this.checkConnection();

    return await getManager().save<TEntity>(entity);
  }

  /**
   * Check connection to database
   */
  private async checkConnection() {
    if (!this.isConnected) {
      await this.connect();
    }
  }

  /**
   * Create database query object with filters and sorting
   * @param {number} skip
   * @param {number} take
   * @param {IFilter} filter
   * @param {ISorter} sorter
   */
  protected getQuery<TEntity extends IEntity>(skip?: number, take?: number, filter?: IFilter, sorter?: ISorter): SelectQueryBuilder<TEntity> {
    const result: SelectQueryBuilder<TEntity> = createQueryBuilder<TEntity>();

    // TODO Apply filter and sorter
    FilterHelper.applyFilterQueryBuilder<TEntity>(result, filter);
    SorterHelper.applySorterQueryBuilder<TEntity>(result, sorter);

    if (!isNullOrUndefined(skip)) {
      result.skip(skip);
    }
    if (!isNullOrUndefined(take)) {
      result.take(take);
    }

    // TODO Add cacheable query
    return result;
  }
  /**
   * Create database filter option object with filters and sorting
   * @param skip
   * @param take
   * @param filter
   * @param sorter
   */
  protected getOptions<TEntity extends IEntity>(skip?: number, take?: number, filter?: IFilter, sorter?: ISorter): FindManyOptions<TEntity> {
    const result: FindManyOptions<TEntity> = {};

    FilterHelper.applyFilter(result, filter);
    SorterHelper.applySorter(result, sorter);

    if (!isNullOrUndefined(skip)) {
      result.skip = skip;
    }
    if (!isNullOrUndefined(take)) {
      result.take = take;
    }
    // TODO Add cacheable query
    return result;
  }

  public async commit(): Promise<void> {
    throw new NotImplementedException('Not implemented in TypeORM Data Persisiter');
  }

  /**
   * Count of entity in DB
   * @param type - Entity type
   * @param filter - Entity filter
   */
  public async count<TEntity extends IEntity>(type: (new () => TEntity), filter: IFilter): Promise<number> {
    const entitySchema: EntitySchema<TEntity> = baseResolver.getNamedOrDefault<EntitySchema<TEntity>>(TYPES.IEntityMapping, type.name);
    const findOptions: FindManyOptions<TEntity> = this.getOptions<TEntity>(null, null, filter, null);
    return await getManager().count(entitySchema, findOptions);
  }
  public async rollback(): Promise<void> {
    throw new NotImplementedException('Not implemented in TypeORM Data Persisiter');
  }
}

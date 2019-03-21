import { injectable } from 'inversify';
import { IEntity } from '../../Model/Entities.Base.Face';
import { IDataAccessProvider, IEntityDao, IQuery } from '../DataAccess.Face';

/**
 * Properties and methods description the standard data access object
 */
@injectable()
export class EntityDao<TEntity extends IEntity> implements IEntityDao<TEntity> {

  public provider: IDataAccessProvider;

  public async delete(entity: TEntity): Promise<void> {
    await this.provider.save(entity);
  }

  public async save(entity: TEntity): Promise<TEntity> {
    return await this.provider.save(entity);
  }

  public async select(id: any): Promise<TEntity>;
  public async select(): Promise<TEntity[]>;
  public async select(id?: any, query?: IQuery): Promise<any> {
    return await this.provider.get(id, query);
  }
}

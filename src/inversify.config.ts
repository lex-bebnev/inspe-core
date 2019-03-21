import { Container as BaseContainer, interfaces } from 'inversify';
import { DataAccessProvider, EntityDao } from './DataAccessLayer/DataAccess.Common';
import { IDataAccessProvider, IDataPersister, IEntityDao } from './DataAccessLayer/DataAccess.Face';
import { TypeOrmDataPersister } from './DataAccessLayer/TypeOrm';
import { IEntity } from './Model';
import { TYPES } from './types';

class Container extends BaseContainer {

  constructor(containerOptions?: interfaces.ContainerOptions) {
    super(containerOptions);
  }

  /**
   * Resolve named or default binding
   * @param type - Resolving type
   * @param name - Name of resolving type
   */
  public getNamedOrDefault<T>(type: string, name: string): T {
    return this.isBoundNamed(type, name)
      ? this.getNamed<T>(type, name)
      : this.get<T>(type);
  }
}

// TODO Create config for Core module and create merge template
const baseResolver: Container = new Container();

baseResolver.bind<IDataPersister>(TYPES.IDataPersister).toConstantValue(new TypeOrmDataPersister());
baseResolver.bind<IDataAccessProvider>(TYPES.IDataAccessProvider).to(DataAccessProvider);
baseResolver.bind<IEntityDao<IEntity>>(TYPES.IEntityDao).to(EntityDao);

export { Container, baseResolver };

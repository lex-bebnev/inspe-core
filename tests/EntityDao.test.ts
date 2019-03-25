import { Substitute } from '@fluffy-spoon/substitute';
import 'reflect-metadata';
import { EntityDao } from '../src/DataAccessLayer/DataAccess.Common';
import { IDataAccessProvider, IEntityDao } from '../src/DataAccessLayer/DataAccess.Face';
import { ArgumentNullException } from '../src/Exceptions';
import { IEntity } from '../src/Model/Entities.Base.Face';

class DummyClass implements IEntity {
  public id: number | string;
}

describe('EntityDao', () => {
  const mockProvider = Substitute.for<IDataAccessProvider>();

  describe('Create new instance of EntityDao', () => {
    it('Should throws without Provider', () => {
      expect(() => new EntityDao<DummyClass>(null)).toThrowError(ArgumentNullException);
    });
    it('Should create new instance correctly', () => {
      expect(() => new EntityDao(mockProvider)).toBeDefined();
    });
  });

  describe('Call count method', () => {
    it('Should count correctly', async () => {
      const count: number = 42;

      mockProvider.count(DummyClass, null).returns(Promise.resolve(count));

      const dao: IEntityDao<DummyClass> = new EntityDao<DummyClass>(mockProvider);
      const result = await dao.count(DummyClass);
      expect(result).toEqual(count);

      mockProvider.received(1).count(DummyClass, null);
    });
    it('Should throws without type', async () => {
      const dao: IEntityDao<DummyClass> = new EntityDao<DummyClass>(mockProvider);
      expect.assertions(1);
      try {
        await dao.count(undefined);
      } catch (e) {
        expect(e).toEqual(new ArgumentNullException('type'));
      }
    });
  });

  describe('Call save method', () => {
    it('Should save new entity correctly', async () => {

      const dummyEntity: DummyClass = new DummyClass();

      const dao: IEntityDao<DummyClass> = new EntityDao<DummyClass>(mockProvider);
      await dao.save(dummyEntity);
      mockProvider.received(1).save(dummyEntity);
    });
    it('Should throws when save null', async () => {
      const dao: IEntityDao<DummyClass> = new EntityDao<DummyClass>(mockProvider);
      try {
        await dao.save(null);
      } catch (e) {
        expect(e).toEqual(new ArgumentNullException('entity'));
      }
    });
  });

  describe('Call delete method', () => {
    it('Should delete entity correctly', async () => {
      const dummyEntity: DummyClass = new DummyClass();
      const dao: IEntityDao<DummyClass> = new EntityDao<DummyClass>(mockProvider);

      await dao.delete<DummyClass>(DummyClass, dummyEntity);
      mockProvider.received(1).delete(DummyClass, dummyEntity);
    });
    it('Should throws when delete null', async () => {
      const dao: IEntityDao<DummyClass> = new EntityDao<DummyClass>(mockProvider);
      try {
        await dao.delete(DummyClass, null);
      } catch (e) {
        expect(e).toEqual(new ArgumentNullException('entity'));
      }
    });
    it('Should throws when delete type null', async () => {
      const dummyEntity = Substitute.for<DummyClass>();
      const dao: IEntityDao<DummyClass> = new EntityDao<DummyClass>(mockProvider);
      try {
        await dao.delete(null, dummyEntity);
      } catch (e) {
        expect(e).toEqual(new ArgumentNullException('type'));
      }
    });
  });

  describe('Call select by id method', () => {
    it('Should select entity by id correctly', async () => {
      const dummyEntity = Substitute.for<DummyClass>();
      const dao: IEntityDao<DummyClass> = new EntityDao<DummyClass>(mockProvider);
      const entityId: number = 1;
      mockProvider.get(DummyClass, entityId).returns(Promise.resolve(dummyEntity));
      const result = await dao.select(DummyClass, entityId);
      expect(result).toBe(dummyEntity);
      mockProvider.received(1).get(DummyClass, entityId);
    });
    it('Should throws without type', async () => {
      const dao: IEntityDao<DummyClass> = new EntityDao<DummyClass>(mockProvider);
      try {
        await dao.select(undefined);
      } catch (e) {
        expect(e).toEqual(new ArgumentNullException('type'));
      }
    });
  });
});

import { Substitute } from '@fluffy-spoon/substitute';
import 'reflect-metadata';
import { DataAccessProvider } from '../src/DataAccessLayer/DataAccess.Common';
import { IDataPersister } from '../src/DataAccessLayer/DataAccess.Face';
import { ArgumentNullException } from '../src/Exceptions';

describe('DataAccessProvider', () => {
  const mockPersister = Substitute.for<IDataPersister>();

  describe('Create new instance of DataAccessProvider', () => {
    it('Should throws without Persister', () => {
      expect(() => new DataAccessProvider(null)).toThrowError(ArgumentNullException);
    });
    it('Should create new instance correctly', () => {
      expect(() => new DataAccessProvider(mockPersister)).toBeDefined();
    });
  });
});

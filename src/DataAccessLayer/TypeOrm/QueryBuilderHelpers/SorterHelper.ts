import { FindManyOptions, OrderByCondition, SelectQueryBuilder } from 'typeorm';
import { ArgumentNullException } from '../../../Exceptions';
import { isNullOrUndefined } from '../../../Helpers';
import { DALException } from '../../DataAccess.Common/Exceptions';
import { Sorter } from '../../DataAccess.Common/Querying';
import { ISorter, ISorterEntry, SortDirection } from '../../DataAccess.Face';

/**
 * Sorter helper
 */
export class SorterHelper {

  /**
   * Transform ISorter into TypeORM QueryBuilder
   */
  public static applySorterQueryBuilder<TEntity>(query: SelectQueryBuilder<TEntity>, sorter: ISorter): void {
    if (isNullOrUndefined(query)) {
      throw new ArgumentNullException('query');
    }

    let internalSorter = sorter;

    // Don't allow empty sorters
    if (isNullOrUndefined(internalSorter) || isNullOrUndefined(internalSorter.values) || !internalSorter.values.length) {
      internalSorter = new Sorter().addSorter('id', SortDirection.Desc);
    }

    // Clear previous orders in queryBuilder
    query.orderBy();
    const orderByCondition: OrderByCondition = {};

    internalSorter.values.forEach((item: ISorterEntry) => {
      if (isNullOrUndefined(item.propertyName) || !item.propertyName.length) {
        throw new DALException('Server sorter alias not found');
      }
      SorterHelper.getAliasedOrder(orderByCondition, item);
    });

    query.orderBy(orderByCondition);
  }

  public static applySorter<TEntity>(query: FindManyOptions<TEntity>, sorter: ISorter): void {
    if (isNullOrUndefined(query)) {
      throw new ArgumentNullException('query');
    }
    let internalSorter = sorter;

    // Don't allow empty sorters
    if (isNullOrUndefined(internalSorter) || isNullOrUndefined(internalSorter.values) || !internalSorter.values.length) {
      internalSorter = new Sorter().addSorter('id', SortDirection.Desc);
    }
    // Clear previous orders in queryBuilder
    query.order = {};
    const orderByCondition = {};

    internalSorter.values.forEach((item: ISorterEntry) => {
      if (isNullOrUndefined(item.propertyName) || !item.propertyName.length) {
        throw new DALException('Server sorter alias not found');
      }
      SorterHelper.getAliasedOrder(orderByCondition, item);
    });
    query.order = orderByCondition; // TODO Use type definition for order property
  }

  private static getAliasedOrder(orderCondition: OrderByCondition, sorterEntry: ISorterEntry): OrderByCondition {
    switch (sorterEntry.direction) {
      case SortDirection.Asc:
        orderCondition[sorterEntry.propertyName] = 'ASC';
        break;
      case SortDirection.Desc:
        orderCondition[sorterEntry.propertyName] = 'DESC';
        break;
    }
    return orderCondition;
  }
}

import { Brackets, Equal, FindConditions, FindManyOptions, MoreThan, MoreThanOrEqual, Not, SelectQueryBuilder } from 'typeorm';
import { ArgumentNullException, NotImplementedException } from '../../../Exceptions';
import { isNullOrUndefined } from '../../../Helpers';
import { ConditionOperator, IFilter, IFilterEntry, IFilterGroup, LogicalOperator } from '../../DataAccess.Face';

/**
 * Filter helper class
 */
export class FilterHelper {

  /**
   * Transform IFilter into TypeOrm QueryBuilder
   * @param query
   * @param filter
   */
  public static applyFilterQueryBuilder<TEntity>(query: SelectQueryBuilder<TEntity>, filter: IFilter): void {
    if (isNullOrUndefined(query)) {
      throw new ArgumentNullException('query');
    }
    if (!FilterHelper.isFilterValid(filter)) {
      return;
    }

    const whereCondition: Brackets = this.getGroupJunction(filter.rootGroup);
    if (!isNullOrUndefined(whereCondition)) {
      query.where(whereCondition);
    }
  }

  public static applyFilter<TEntity>(query: FindManyOptions<TEntity>, filter: IFilter): void {
    if (isNullOrUndefined(query)) {
      throw new ArgumentNullException('query');
    }
    if (!FilterHelper.isFilterValid(filter)) {
      return;
    }

    query.where = FilterHelper.getWhereOptions<TEntity>(filter.rootGroup);
  }

  private static getWhereOptions<TEntity>(group: IFilterGroup): FindConditions<TEntity>[] {
    if ((isNullOrUndefined(group.entries) || !group.entries.length) && (isNullOrUndefined(group.groups) || !group.groups.length)) {
      return null;
    }
    let findConditions = [];

    const baseExpression = [];
    if (group.entries && group.entries.length) {
      group.entries.forEach((entry: IFilterEntry) => {
        baseExpression.push({ [entry.propertyName]: FilterHelper.getTypeOrmOperator(entry) });
      });
    }

    switch (group.operator) {
      case LogicalOperator.Or:
        findConditions = [...baseExpression];
        break;
      case LogicalOperator.And:
        let andCondition = {};
        baseExpression.forEach((item) => {
          andCondition = { ...andCondition, ...item };
        });
        findConditions.push(andCondition);
        break;
    }

    if (group.groups && group.groups.length) {
      group.groups.forEach((item: IFilterGroup) => {
        const internalCondition = FilterHelper.getWhereOptions(item);
        if (internalCondition) {
          switch (group.operator) {
            case LogicalOperator.Or:
              internalCondition.forEach(item => findConditions.push(item));
              break;
            case LogicalOperator.And:
              const andCondition = findConditions[0] || {};
              findConditions = internalCondition.map((item) => { return { ...andCondition, ...item }; });
              break;
          }
        }
      });
    }

    return findConditions;
  }

  private static getTypeOrmOperator(entry: IFilterEntry) {
    switch (entry.operator) {
      case ConditionOperator.Equal:
        return Equal(entry.values[0]);
      case ConditionOperator.NotEqual:
        return Not(Equal(entry.values[0]));
      case ConditionOperator.Greater:
        return MoreThan(entry.values[0]);
      case ConditionOperator.GreaterOrEqual:
        return MoreThanOrEqual(entry.values[0]);
    }
  }

// empty
// empty
// empty
// empty
// empty
// TODO Доделать функционал QueryBuilder под разные типы БД
  private static getGroupJunction(group: IFilterGroup): Brackets {
    if ((isNullOrUndefined(group.entries) || !group.entries.length) && (isNullOrUndefined(group.groups) || !group.groups.length)) {
      return null;
    }

    // Entries conditions
    const entriesBrackets: Brackets[] = [];
    if (group.entries && group.entries.length) {
      group.entries.forEach((entry: IFilterEntry) => {
        entriesBrackets.push();
      });
    }

    const bracket = new Brackets((qb) => {});

    // inner groups conditions
    if (isNullOrUndefined(group.groups) || !group.groups.length) {
      return bracket;
    }
    group.groups.forEach((innerGroup) => {
      const innerBracket = this.getGroupJunction(innerGroup);
    });
    return bracket;
  }

  private static getAliasedEntriesBracket(filterEntry: IFilterEntry): Brackets {
    const whereCondition = this.getWhere(filterEntry);
    return new Brackets((qb => qb.where(whereCondition)));
  }

  private static getWhere(filterEntry: IFilterEntry) {
    const operatorValueSubQuery = this.processValueEntryCondition(filterEntry);
    return `${filterEntry.propertyName} ${operatorValueSubQuery}`;
  }

  private static isFilterValid(filter): boolean {
    const rootGroupCondition: boolean = (isNullOrUndefined(filter)
      || isNullOrUndefined(filter.rootGroup));

    const entriesCondition = rootGroupCondition
      || (isNullOrUndefined(filter.rootGroup.entries)
      || !filter.rootGroup.entries.length);

    const groupCondition = rootGroupCondition
      || (isNullOrUndefined(filter.rootGroup.groups)
      || !filter.rootGroup.groups.length);

    return !(entriesCondition && groupCondition);
  }

  private static processValueEntryCondition(filterEntry: IFilterEntry) {
    // TODO get single elements from array
    switch (filterEntry.operator) {
      case ConditionOperator.Equal:
        return `${filterEntry.propertyName} = ${filterEntry.values[0]}`;
      case ConditionOperator.Between:
        return `${filterEntry.propertyName} between `;
    }
    throw new NotImplementedException();
  }
}

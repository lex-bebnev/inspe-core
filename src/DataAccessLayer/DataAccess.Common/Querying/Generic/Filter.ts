import { IEntity } from '../../../../Model/Entities.Base.Face';
import { ConditionOperator, IFilter, IFilterGroup, LogicalOperator } from '../../../DataAccess.Face/Querying';
import { FilterGroup } from '../FilterGroup';

/**
 * Entity filter <Sealed/>
 */
export class Filter<TEntity extends IEntity> implements IFilter {

  /**
   * Root group of filter conditionals
   */
  public readonly rootGroup: IFilterGroup;

  /**
   * Initialize new instance of <class>Filter</class>
   * @param {LogicalOperator} logicalOperator - Logical operator for root group of filter
   */
  public constructor(logicalOperator: LogicalOperator) {
    this.rootGroup = new FilterGroup(logicalOperator);
  }

  /**
   * Add nested group of entity selection conditions
   * @param {IFilterGroup} group - Added filter group
   */
  public addGroup(group: IFilterGroup): IFilter {
    this.rootGroup.addGroup(group); // RootGroup will not be null!
    return this;
  }

  /**
   * Add new selection condition filter by property value list using for IN, BETWEEN e.t.c.
   * @param {string} property - Property name
   * @param {ConditionOperator} condition - Conditional operator
   * @param {...object} values - List of property value
   */
  public addListValueEntry(property: string, condition: ConditionOperator, values: any[]): IFilter {
    this.rootGroup.addListValueEntry(property, condition, values);
    return this;
  }

  /**
   * Add new selection condition filter by property value
   * @param {string} property - Property name
   * @param {ConditionOperator} condition - Conditional operator
   * @param {object} value - List of property value
   */
  public addValueEntry(property: string, condition: ConditionOperator, value: any): IFilter {
    this.rootGroup.addValueEntry(property, condition, value);
    return this;
  }

  private addValueEntryExpression<TEntity extends IEntity>(property: string, condition: ConditionOperator, value: any): Filter<TEntity> {
    this.addValueEntry(property, condition, value);
    return this;
  }

  private addListValueEntryExpression<TEntity extends IEntity>(property: string, condition: ConditionOperator, values: any[]): Filter<TEntity> {
    this.addValueEntry(property, condition, values);
    return this;
  }

  public equal<T extends IEntity, K extends keyof T>(parameter: keyof T, value: T[K]): Filter<T> {
    return this.addValueEntryExpression(parameter.toString(), ConditionOperator.Equal, value);
  }

  public notEqual<T extends IEntity, K extends keyof T>(parameter: keyof T, value: T[K]): Filter<T> {
    return this.addValueEntryExpression(parameter.toString(), ConditionOperator.NotEqual, value);
  }

  public between<T extends IEntity, K extends keyof T>(parameter: keyof T, minValue: T[K], maxValue: T[K]): Filter<T> {
    return this.addListValueEntryExpression(parameter.toString(), ConditionOperator.Between, [minValue, maxValue]);
  }
}

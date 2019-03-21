import { ConditionOperator } from './ConditionOperator';
import { IFilterGroup } from './IFilterGroup';

/**
 * Entity filter
 */
export interface IFilter {

  /**
   * Root group of filter conditionals
   */
  readonly rootGroup: IFilterGroup;

  /**
   * Add nested group of entity selection conditions
   * @param {IFilterGroup} group - Added filter group
   */
  addGroup(group: IFilterGroup): IFilter;

  /**
   * Add new selection condition filter by property value
   * @param {string} property - Property name
   * @param {ConditionOperator} condition - Conditional operator
   * @param {object} value - List of property value
   */
  addValueEntry(property: string, condition: ConditionOperator, value: any): IFilter;

  /**
   * Add new selection condition filter by property value list using for IN, BETWEEN e.t.c.
   * @param {string} property - Property name
   * @param {ConditionOperator} condition - Conditional operator
   * @param {...object} values - List of property value
   */
  addListValueEntry(property: string, condition: ConditionOperator, values: any[]): IFilter;
}

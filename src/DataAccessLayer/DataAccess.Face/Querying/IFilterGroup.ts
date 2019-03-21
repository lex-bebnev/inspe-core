import { ConditionOperator } from './ConditionOperator';
import { IFilterEntry } from './IFilterEntry';
import { LogicalOperator } from './LogicalOperator';

/**
 * Group of entity selection condition
 */
export interface IFilterGroup {

  /**
   * Logical operator
   */
  readonly operator: LogicalOperator;

  /**
   * List of conditions
   */
  readonly entries: ReadonlyArray<IFilterEntry>;

  /**
   * List of condition groups
   */
  readonly groups: ReadonlyArray<IFilterGroup>;

  /**
   * Add nested group of entity selection conditions
   * @param {IFilterGroup} group - Added filter group
   */
  addGroup(group: IFilterGroup): IFilterGroup;

  /**
   * Add entity selection condition in group
   * @param {IFilterEntry} entry - selection condition
   */
  addEntry(entry: IFilterEntry): IFilterGroup;

  /**
   * Add new selection condition in group by property value
   * @param {string} propertyName - Property name
   * @param {ConditionOperator} conditionOperator - Conditional operator
   * @param {object} value - List of property value
   */
  addValueEntry(propertyName: string, conditionOperator: ConditionOperator, value: any): IFilterGroup;

  /**
   * Add new selection condition in group by property value list
   * @param {string} propertyName - Property name
   * @param {ConditionOperator} conditionOperator - Conditional operator
   * @param {...object} values - List of property value
   */
  addListValueEntry(propertyName: string, conditionOperator: ConditionOperator, values: any[]): IFilterGroup;

}

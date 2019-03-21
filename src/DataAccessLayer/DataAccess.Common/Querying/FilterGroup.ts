import { ConditionOperator, IFilterEntry, IFilterGroup, LogicalOperator } from '../../DataAccess.Face';
import { FilterEntry } from './FilterEntry';

/**
 * Group of entity selection condition
 */
export class FilterGroup implements IFilterGroup{

  private _entries: IFilterEntry[];
  private _groups: IFilterGroup[];

  /**
   * List of conditions
   */
  public get entries(): ReadonlyArray<IFilterEntry> {
    return this._entries as ReadonlyArray<IFilterEntry>;
  }
  /**
   * List of condition groups
   */
  public get groups(): ReadonlyArray<IFilterGroup> {
    return this._groups as ReadonlyArray<IFilterGroup>;
  }
  /**
   * Logical operator
   */
  public readonly operator: LogicalOperator;

  /**
   * Initialize new instance of <class>FilterGroup</class>
   * @param {LogicalOperator} operator - Logical operator
   */
  public constructor(operator: LogicalOperator) {
    this.operator = operator;
    this._entries = [];
    this._groups = [];
  }

  /**
   * Add entity selection condition in group
   * @param {IFilterEntry} entry - selection condition
   */
  public addEntry(entry: IFilterEntry): IFilterGroup {
    if (!this._entries) {
      this._entries = [];
    }
    this._entries.push(entry);
    return this;
  }

  /**
   * Add nested group of entity selection conditions
   * @param {IFilterGroup} group - Added filter group
   */
  public addGroup(group: IFilterGroup): IFilterGroup {
    if (!this._groups) {
      this._groups = [];
    }
    this._groups.push(group);
    return this;
  }

  /**
   * Add new selection condition in group by property value list
   * @param {string} propertyName - Property name
   * @param {ConditionOperator} conditionOperator - Conditional operator
   * @param {...object} values - List of property value
   */
  public addListValueEntry(propertyName: string, conditionOperator: ConditionOperator, values: any[]): IFilterGroup {
    if (!this._entries) {
      this._entries = [];
    }
    this._entries.push(FilterEntry.createListValueFilterEntry(propertyName, conditionOperator, values));
    return this;
  }

  /**
   * Add new selection condition in group by property value
   * @param {string} propertyName - Property name
   * @param {ConditionOperator} conditionOperator - Conditional operator
   * @param {object} value - List of property value
   */
  public addValueEntry(propertyName: string, conditionOperator: ConditionOperator, value: any): IFilterGroup {
    if (!this._entries) {
      this._entries = [];
    }
    this._entries.push(FilterEntry.createValueFilterEntry(propertyName, conditionOperator, value));
    return this;
  }
}

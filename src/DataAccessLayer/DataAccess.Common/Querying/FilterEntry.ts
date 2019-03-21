import { ArgumentNullException } from '../../../Exceptions';
import { ConditionOperator, IFilterEntry } from '../../DataAccess.Face';

/**
 * Condition of entity select
 */
export class FilterEntry implements IFilterEntry {

  /**
   * Condition operator
   */
  public readonly operator: ConditionOperator;

  /**
   * Property name
   */
  public readonly propertyName: string;

  /**
   * Condition value
   */
  public readonly values: ReadonlyArray<any>;

  /**
   * Initialize instance of <class>FilterEntry</class>
   * @param {string} propertyName - Property name
   * @param {ConditionOperator} operator - Conditional operator
   * @param {...object} values - Property value
   */
  public constructor(propertyName: string, operator: ConditionOperator, values: any[]) {
    if (values === null || values === undefined) {
      throw new ArgumentNullException('values');
    }
    this.operator = operator;
    this.propertyName = propertyName;
    this.values = values as ReadonlyArray<any>;
  }

  public static createValueFilterEntry(propertyName: string, conditionalOperator: ConditionOperator, value: any): FilterEntry {
    return new FilterEntry(propertyName, conditionalOperator, [value]);
  }

  public static createListValueFilterEntry(propertyName: string, conditionalOperator: ConditionOperator, values: any[]): FilterEntry {
    return new FilterEntry(propertyName, conditionalOperator, values);
  }
}

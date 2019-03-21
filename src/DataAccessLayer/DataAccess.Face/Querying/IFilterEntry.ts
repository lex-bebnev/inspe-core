import { ConditionOperator } from './ConditionOperator';

/**
 * Condition of entity select
 */
export interface IFilterEntry {

  /**
   * Condition operator
   */
  readonly operator: ConditionOperator;

  /**
   * Property name
   */
  readonly propertyName: string;

  /**
   * Condition value
   */
  readonly values: ReadonlyArray<any>;
}

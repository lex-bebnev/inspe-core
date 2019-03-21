import { SortDirection } from './SortDirection';

/**
 * Sorting condition
 */
export interface ISorterEntry {

  /**
   * Sorting direction
   */
  readonly direction: SortDirection;

  /**
   * Name of the property being sorted
   */
  readonly propertyName: string;
}

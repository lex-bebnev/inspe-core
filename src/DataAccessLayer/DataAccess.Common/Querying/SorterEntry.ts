import { ISorterEntry, SortDirection } from '../../DataAccess.Face';

/**
 * Sorting condition
 */
export class SorterEntry implements ISorterEntry {

  /**
   * Sorting direction
   */
  public readonly direction: SortDirection;

  /**
   * Name of the property being sorted
   */
  public readonly propertyName: string;

  /**
   * Initialize new instance of <class>SorterEntry</class>
   * @param {string} propertyName - Name of the property being sorted
   * @param {SortDirection} direction - Sorting direction
   */
  public constructor(propertyName: string, direction: SortDirection) {
    this.direction = direction;
    this.propertyName = propertyName;
  }
}

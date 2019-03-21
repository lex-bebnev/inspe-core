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
   * @param {SortDirection} direction - Sorting direction
   * @param {string} propertyName - Name of the property being sorted
   */
  public constructor(direction: SortDirection, propertyName: string) {
    this.direction = direction;
    this.propertyName = propertyName;
  }
}

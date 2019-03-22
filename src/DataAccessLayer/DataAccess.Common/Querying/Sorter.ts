import { ISorter, ISorterEntry, SortDirection } from '../../DataAccess.Face';
import { SorterEntry } from './SorterEntry';

/**
 * Entity List Sorting Condition Set
 */
export class Sorter implements ISorter {

  private _values: ISorterEntry[];

  /**
   * List of Sorting conditions
   */
  public get values(): ReadonlyArray<ISorterEntry> {
    return this._values as ReadonlyArray<ISorterEntry>;
  }

  /**
   * Initialize new instance of <class>Sorter</class>
   * @param {...ISorterEntry} values - Sorting conditions array
   */
  public constructor(values?: ISorterEntry[]) {
    if (!values) {
      this._values = values;
    }
    this._values = [];
  }

  /**
   * Add sorting condition
   * @param {ISorterEntry} entry - Sorter Entry
   */
  public add(entry: ISorterEntry): ISorter {
    if (!this._values) {
      this._values = [];
    }
    this._values.push(entry);
    return this;
  }

  /**
   * Add sorting condition
   * @param {string} propertyName - Sorted property
   * @param {SortDirection} state - Sorting direction
   */
  public addSorter(propertyName: string, state: SortDirection): Sorter {
    this.add(new SorterEntry(propertyName, state));
    return this;
  }

  /**
   * Clear all sorting conditions
   */
  public clear(): void {
    this._values.length = 0; // Fastest performance http://jsben.ch/hyj65
  }

}

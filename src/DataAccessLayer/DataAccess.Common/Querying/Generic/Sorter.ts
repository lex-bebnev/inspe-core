import { IEntity } from '../../../../Model/Entities.Base.Face';
import { ISorter, ISorterEntry, SortDirection } from '../../../DataAccess.Face/Querying';
import { SorterEntry } from '../SorterEntry';

/**
 * Entity List Sorting Condition Set
 */
export class Sorter<TEntity extends IEntity> implements ISorter{

  private _values: ISorterEntry[];

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
   * List of Sorting conditions
   */
  public get values(): ReadonlyArray<ISorterEntry> {
    return this._values as ReadonlyArray<ISorterEntry>;
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
   * Clear all sorting conditions
   */
  public clear(): void {
    this._values.length = 0; // Fastest performance http://jsben.ch/hyj65
  }

  /**
   * Add ASC sorting condition
   * @param member
   */
  public ascBy<TEntity extends IEntity>(member: keyof TEntity): Sorter<TEntity> {
    const propertyName: string = member.toString();
    this.add(new SorterEntry(propertyName, SortDirection.Asc));
    return this;
  }

  /**
   * Add DESC sorting condition
   * @param member
   */
  public descBy<TEntity extends IEntity>(member: keyof TEntity): Sorter<TEntity> {
    const propertyName: string = member.toString();
    this.add(new SorterEntry(propertyName, SortDirection.Desc));
    return this;
  }
}

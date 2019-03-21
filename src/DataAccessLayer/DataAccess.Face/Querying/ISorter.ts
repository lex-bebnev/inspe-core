import { ISorterEntry } from './ISorterEntry';

/**
 * Entity List Sorting Condition Set
 */
export interface ISorter {
  /**
   * List of Sorting conditions
   */
  readonly values: ReadonlyArray<ISorterEntry>;

  /**
   * Add sorting condition
   * @param {ISorterEntry} entry - Sorter Entry
   */
  add(entry: ISorterEntry): ISorter;

  /**
   * Clear all sorting conditions
   */
  clear(): void;
}

import { IFilter } from './IFilter';
import { ISorter } from './ISorter';

/**
 * Full condition and order of loading entities
 */
export interface IQuery {

  /**
   * Condition of loading entities
   */
  readonly filter: IFilter;

  /**
   * Condition of sorting entities
   */
  readonly sorter: ISorter;

  /**
   * Number of entities to skip
   */
  readonly skip: number;

  /**
   * Maximum number of entities in result
   */
  readonly take: number;

  /**
   * Cache request
   * @param True - use caching
   * @param False - do not use caching
   * @param null|undefined - use default value
   */
  readonly cacheable: boolean;
}

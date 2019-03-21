import { IFilter, IQuery, ISorter } from '../../DataAccess.Face';

/**
 * Full condition and order of loading entities
 */
export class Query implements IQuery {

  /**
   * Condition of loading entities
   */
  public readonly filter: IFilter;

  /**
   * Condition of sorting entities
   */
  public readonly sorter: ISorter;

  /**
   * Number of entities to skip
   */
  public readonly skip: number;

  /**
   * Maximum number of entities in result
   */
  public readonly take: number;

  /**
   * Cache request
   * @param True - use caching
   * @param False - do not use caching
   * @param null|undefined - use default value
   */
  public readonly cacheable: boolean;
  /**
   * Initialize new instance of <class>Query</class>
   * @param {number} skip - Number of skipping entities
   * @param {number} take - Maximum number of entities in result
   * @param {IFilter} filter - Condition of loading entities
   * @param {ISorter} sorter - Condition of sorting entities
   * @constructor
   */
  public constructor(skip?: number, take?: number, filter?: IFilter, sorter?: ISorter, cacheable?: boolean) {
    this.filter = filter;
    this.sorter = sorter;
    this.skip = skip;
    this.take = take;
    this.cacheable = cacheable;
  }

  /**
   * Empty query - selected all entities from database
   * @constructor
   */
  public static get empty(): IQuery {
    return new Query();
  }

}

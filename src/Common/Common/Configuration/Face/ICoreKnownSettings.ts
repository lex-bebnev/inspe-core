/**
 * Provides convenient access to built-in platform settings
 */
export interface ICoreKnownSettings {
  /**
   * Enable support for tagging entities as deleted.
   */
  readonly enableEntitySoftDelete: boolean;
  /**
   * Allow physical deletion of records from the database at the DAO level
   */
  readonly allowPhysicalDelete: boolean;
}

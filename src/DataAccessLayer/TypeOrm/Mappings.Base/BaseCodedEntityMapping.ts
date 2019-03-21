import { EntitySchemaColumnOptions } from 'typeorm';

/**
 * Base mapping fo coded entity
 */
export const BaseCodedEntityMapping = {
  code: {
    name: 'code',
    type: 'varchar',
  } as EntitySchemaColumnOptions,
};

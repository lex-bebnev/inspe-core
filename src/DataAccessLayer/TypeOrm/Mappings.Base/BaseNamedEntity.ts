import { EntitySchemaColumnOptions } from 'typeorm';

/**
 *  Base mapping for named entity
 */
export const BaseNamedEntity = {
  name: {
    type: 'varchar',
    name: 'name',
	nullable: false,
  } as EntitySchemaColumnOptions,
};

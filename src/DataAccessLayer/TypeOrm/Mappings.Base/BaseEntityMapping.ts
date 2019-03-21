// https://github.com/typeorm/typeorm/issues/3730#issuecomment-468670264
import { EntitySchemaColumnOptions } from 'typeorm';

/**
 * Base entity mapping
 */
export const BaseEntityMapping = {

  id: {
    type: 'bigint',
    primary: true,
    generated: true,
  } as EntitySchemaColumnOptions,
  createdAt: {
    name: 'created_at',
    type: 'timestamp with time zone',
    createDate: true,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: 'updated_at',
    type: 'timestamp with time zone',
    updateDate: true,
  } as EntitySchemaColumnOptions,
  isActive: {
      name: 'active',
      type: 'bool',
      default: true,
  } as EntitySchemaColumnOptions,
};

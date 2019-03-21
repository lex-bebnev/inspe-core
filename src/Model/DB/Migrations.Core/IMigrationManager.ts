import { MigrationConfiguration } from './MigrationConfiguration';

export interface IMigrationManager {
  update(configuration: MigrationConfiguration): Promise<void>;
}

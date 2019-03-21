import { AuthState } from './AuthState';

/**
 * Authentication result
 */
export class AuthResult {
  /**
   * Session GUID
   */
  public sessionId: string;
  /**
   * Authentication state
   */
  public state: AuthState;
  /**
   * User identificator
   */
  public userId: string | number;
  /**
   * Additional information
   */
  public details: string;
}

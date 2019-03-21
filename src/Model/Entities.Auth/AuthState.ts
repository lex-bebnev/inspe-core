/**
 * Authentication state
 */
export enum AuthState {
  /**
   * Error
   */
  INVALID,
  /**
   * Successful authentication
   */
  Success,
  /**
   * User blocked
   */
  UserBlocked,
  /**
   * User blocked by IP
   */
  UserIPBlocked,
  /**
   * Incorrect user name or password
   */
  CredentialsIncorrect,
  /**
   * Password expired
   */
  PasswordExpired,
  /**
   * Access Denied
   */
  AccessDenied,
}

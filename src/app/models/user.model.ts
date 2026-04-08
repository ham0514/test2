export interface User {
  username: string;
  password: string;
  displayName?: string;
  role?: string;
}

/** User profile without credentials — stored in session after login. */
export interface AuthenticatedUser {
  username: string;
  displayName?: string;
  role?: string;
}

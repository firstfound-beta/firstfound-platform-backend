export enum Role {
  Customer = 'customer',
  Admin = 'admin',
  User = 'user',
  Investor = 'investor',
}

// Dynamically extract values
export const VALID_ROLES: string[] = Object.values(Role);

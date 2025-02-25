import { SetMetadata } from '@nestjs/common';

export enum UserRole {
  ADMIN = 'Admin',
  USER = 'User',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

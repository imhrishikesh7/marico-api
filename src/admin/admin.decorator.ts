import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_ADMIN_KEY = 'isAdmin';
export const AdminOnly = (): CustomDecorator<string> => SetMetadata(IS_ADMIN_KEY, true);

import { Admin } from '../admin/entities/admin.entity';
import { MenuItem } from '../lib/menu';

export type AdminRequest = {
  admin: Admin;
  menu: MenuItem[];
} & Request;

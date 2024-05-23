interface Permission {
  key: string;
  level: number;
  name: string;
}
const permissions: Permission[] = [
  {
    key: 'DASHBOARD',
    level: 1,
    name: 'Dashboard',
  },
  {
    key: 'ADMIN',
    level: 1,
    name: 'Admin',
  },
  {
    key: 'ADMIN_USERS',
    level: 2,
    name: 'Admin > Users',
  },
  {
    key: 'ADMIN_ACTIVITY',
    level: 2,
    name: 'Admin > Activity',
  },
  {
    key: 'ADMIN_ROLES',
    level: 2,
    name: 'Admin > Roles',
  },
  {
    key: 'REGION',
    level: 1,
    name: 'Region',
  },
  {
    // key: 'REGION_ECOMM_LINK',
    key: 'REGION',
    level: 2,
    name: 'Region > Ecommerce Links',
  },
];

export default permissions;
export { Permission };

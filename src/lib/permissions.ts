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
    key: 'REGION',
    level: 2,
    name: 'Region > Ecommerce Links',
  },
  {
    key: 'ABOUT_US',
    level: 1,
    name: 'About Us > MemberList',
  },
  {
    key: 'ABOUT_US',
    level: 2,
    name: 'About Us > Recognition',
  },
  {
    key: 'ABOUT_US',
    level: 2,
    name: 'About Us > History',
  },
  {
    key: 'BRAND',
    level: 1,
    name: 'Brands > Master',
  },
  {
    key: 'BRAND',
    level: 2,
    name: 'Brands > Print Ad',
  },
  {
    key: 'BRAND',
    level: 2,
    name: 'Brands > TVC',
  },
  {
    key: 'INVESTORS',
    level: 1,
    name: 'Investors > ShareHolder Info',
  },
  {
    key: 'INVESTORS',
    level: 2,
    name: 'Investors > Anual General Meeting',
  },
  {
    key: 'INVESTORS',
    level: 2,
    name: 'Investors > Dividends',
  },
];

export default permissions;
export { Permission };

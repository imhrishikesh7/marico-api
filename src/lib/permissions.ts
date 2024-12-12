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
    key: 'ABOUT_US',
    level: 1,
    name: 'About Us',
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
    name: 'Brands',
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
    name: 'Investors',
  },
  {
    key: 'INVESTORS',
    level: 2,
    name: 'Investors > Annual Reports',
  },
  {
    key: 'INVESTORS',
    level: 2,
    name: 'Investors > Latest Director Reports',
  },
  {
    key: 'INVESTORS',
    level: 2,
    name: 'Investors > Principles on Disclosure of PSI & MI',
  },
  {
    key: 'INVESTORS',
    level: 2,
    name: 'Investors > ShareHolder Info',
  },
  {
    key: 'INVESTORS',
    level: 2,
    name: 'Investors > Annual General Meeting',
  },
  {
    key: 'INVESTORS',
    level: 2,
    name: 'Investors > Dividends',
  },
  {
    key: 'INVESTORS',
    level: 2,
    name: 'Investors > Quarterly Updates',
  },
  {
    key: 'INVESTORS',
    level: 2,
    name: 'Investors > Information Update',
  },
  {
    key: 'INVESTORS',
    level: 2,
    name: 'Investors > Sustainability',
  },
  {
    key: 'INVESTORS',
    level: 2,
    name: 'Investors > Schedule of investors',
  },
  {
    key: 'INVESTORS',
    level: 2,
    name: 'Investors > Corporate Governance',
  },
  {
    key: 'INVESTORS',
    level: 2,
    name: 'Investors > Contact',
  },
  {
    key: 'INVESTORS',
    level: 2,
    name: 'Investors > Placement Document',
  },
  {
    key: 'INVESTORS',
    level: 2,
    name: 'Investors > Price Sensitive Information',
  },
  {
    key: 'INVESTORS',
    level: 2,
    name: 'Investors > FAQ'
  },
  {
    key: 'PAGE',
    level: 1,
    name: 'Pages',
  },
  {
    key: 'MEDIA',
    level: 1,
    name: 'Media',
  },
  {
    key: 'FEATURES',
    level: 1,
    name: 'Features > Title Category',
  },
  {
    key: 'SEO',
    level: 1,
    name: 'Seo',
  },
];

export default permissions;
export { Permission };

interface MenuItem {
  name: string;
  url?: string;
  role?: string[];
  sub?: MenuItem[];
}

const menu: MenuItem[] = [
  {
    name: 'Dashboard',
    url: '/',
    role: ['DASHBOARD'],
  },
  {
    name: 'Region',
    role: ['REGION'],
    sub: [
      {
        name: 'Region',
        url: '/region',
        role: ['REGION'],
      },
    ],
  },
  {
    name: 'About Us',
    role: ['ABOUT_US'],
    sub: [
      {
        name: 'MemberList',
        url: '/about_us/member_lists',
        role: ['ABOUT_US_MEMBER'],
      },
      {
        name: 'Recognition',
        url: '/about_us/recognition',
        role: ['ABOUT_US_RECOGNITION'],
      },
      {
        name: 'History',
        url: '/about_us/history',
        role: ['ABOUT_US_HISTORY'],
      },
    ],
  },
  {
    name: 'Brands',
    role: ['BRAND'],
    sub: [
      {
        name: 'Master',
        url: '/brands/master',
        role: ['BRAND_MASTER'],
      },
      {
        name: 'Print Ad',
        url: '/brands/print_ad',
        role: ['BRAND_PRINT_AD'],
      },
      {
        name: 'TVC',
        url: '/brands/tvc',
        role: ['BRAND_TVC'],
      },
    ],
  },
  {
    name: 'Investors',
    role: ['INVESTOR'],
    sub: [
      {
        name: 'ShareHolder Info',
        url: '/investors/shi',
        role: ['INVESTOR_SHI'],
      },
      {
        name: 'Annual General Meeting',
        url: '/investors/agm',
        role: ['INVESTOR_AGM'],
      },
      {
        name: 'Dividends',
        url: '/investors/dividends',
        role: ['INVESTOR_DIVIDENDS'],
      },
      {
        name: 'Quarterly Updates',
        url: '/investors/quartely_update',
        role: ['INVESTOR_QU'],
      },
      {
        name: 'Information Update',
        url: '/investors/iu',
        role: ['INVESTOR_IU'],
      },
      {
        name: 'Sustainability',
        url: '/investors/sustainability',
        role: ['INVESTOR_SUSTAINABILITY'],
      },
      {
        name: 'Schedule of investors',
        url: '/investors/schedule',
        role: ['INVESTOR_SCHEDULE'],
      },
      {
        name: 'Corporate Governance',
        url: '/investors/cg',
        role: ['INVESTOR_CG'],
      },
      {
        name: 'Contact',
        url: '/investors/contact',
        role: ['INVESTOR_CONTACT'],
      },
      {
        name: 'Placement Document',
        url: '/investors/placement',
        role: ['INVESTOR_PD'],
      },
      {
        name: 'Price Sensitive Information',
        url: '/investors/contact',
        role: ['INVESTOR_PSI'],
      },
    ],
  },
  {
    name: 'Admin',
    role: ['ADMIN'],
    sub: [
      {
        name: 'Users',
        url: '/admin/users',
        role: ['ADMIN_USERS'],
      },
      {
        name: 'Roles',
        url: '/admin/roles',
        role: ['ADMIN_ROLES'],
      },
      {
        name: 'Activity',
        url: '/admin/activity',
        role: ['ADMIN_ACTIVITY'],
      },
    ],
  },
  {
    name: 'Logout',
    url: '/logout',
  },
];

export default menu;
export { MenuItem };

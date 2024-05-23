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
        url: '/region/list',
        role: ['REGION'],
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

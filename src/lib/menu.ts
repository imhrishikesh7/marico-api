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
    name: 'Products',
    role: ['PRODUCTS'],
    sub: [
      {
        name: 'Categories',
        url: '/products/categories',
        role: ['PRODUCTS'],
      },
      {
        name: 'Products',
        url: '/products',
        role: ['PRODUCTS'],
      },
    ],
  },
  {
    name: 'Blogs',
    role: ['BLOGS'],
    sub: [
      {
        name: 'Category',
        url: '/blogposts/categories',
        role: ['BLOGS'],
      },
      {
        name: 'Blogs',
        url: '/blogposts/blogs',
        role: ['BLOGS'],
      },
      {
        name: 'Author',
        url: '/blogposts/author',
        role: ['BLOGS'],
      },
      {
        name: 'Tags',
        url: '/blogposts/tags',
        role: ['BLOGS'],
      },
    ],
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
      {
        name: 'Ecommerce Links',
        url: '/region/links',
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

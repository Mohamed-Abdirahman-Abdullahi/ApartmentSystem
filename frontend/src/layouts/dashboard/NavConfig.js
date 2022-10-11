// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'users',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'employees',
    path: '/dashboard/employees',
    icon: getIcon('clarity:employee-solid'),
  },
  {
    title: 'tenants',
    path: '/dashboard/tenants',
    icon: getIcon('eva:people-outline'),
  },
  {
    title: 'guarantors',
    path: '/dashboard/guarantors',
    icon: getIcon('eva:people-outline'),
  },
  {
    title: 'visitors',
    path: '/dashboard/visitors',
    icon: getIcon('eva:people-outline'),
  },
  {
    title: 'manage apartments',
    icon: getIcon('fe:building'),
    children: [
      {
        title: 'apartments',
        path: '/dashboard/apartments',
        icon: getIcon('flat-color-icons:department'),
      },
      {
        title: 'departments',
        path: '/dashboard/departments',
        icon: getIcon('flat-color-icons:department'),
      },
      {
        title: 'floors',
        path: '/dashboard/floors',
        icon: getIcon('fe:home'),
      },
      {
        title: 'units',
        path: '/dashboard/units',
        icon: getIcon('emojione:door'),
      }
    ]
  },
  {
    title: 'inbox',
    icon: getIcon('carbon:email'),
    children: [{
      title: 'Complaints',
      path: '/dashboard/complaints',
      icon: getIcon('carbon:email'),
    },
    {
      title: 'Maintenances',
      path: '/dashboard/maintenances',
      icon: getIcon('carbon:email'),
    }
    ]
  },
  {
    title: 'reports',
    path: '#',
    icon: getIcon('bxs:report'),
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
];

export default navConfig;

import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Profile from './pages/Profile';
import Employees from './pages/Employees';
import EmpProfile from './pages/EmpProfile';
import Tenants from './pages/Tenants';
import TenantProfile from './pages/tenantProfile';
import Apartments from './pages/Apartments';
import Floor from './pages/Floors';
import Units from './pages/Units';
import Departments from './pages/Departments';
import Visitors from './pages/Visitors';
import Guarantors from './pages/Guarantors';
import Complaints from './pages/Complaints';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'employees', element: <Employees /> },
        { path: 'tenants', element: <Tenants /> },
        { path: 'profile', element: <Profile /> },
        { path: 'empProfile', element: <EmpProfile /> },
        { path: 'tenantProfile', element: <TenantProfile /> },
        { path: 'apartments', element: <Apartments /> },
        { path: 'floors', element: <Floor /> },
        { path: 'units', element: <Units /> },
        { path: 'departments', element: <Departments /> },
        { path: 'visitors', element: <Visitors /> },
        { path: 'guarantors', element: <Guarantors /> },
        { path: 'complaints', element: <Complaints /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}

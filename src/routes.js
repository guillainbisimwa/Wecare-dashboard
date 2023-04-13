import { Navigate, useRoutes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    
    {
      path: 'login',
      element: <LoginPage />,
    },
   
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

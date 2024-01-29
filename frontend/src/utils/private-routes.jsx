import { Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth.context';

const PrivateRoutes = () => {
  const auth = useAuth();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(auth.token);
  }, [auth.token]);

  return (
    <Outlet />
    // token ? <Outlet /> : <Navigate to="/" />
  )
}

export default PrivateRoutes
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';

function PrivateRoute({ redirectTo = '/' }) {
  const isLoggedIn = useSelector(state => getIsLoggedIn(state));
  if (isLoggedIn) return <Outlet to={redirectTo} />;
}

export default PrivateRoute;
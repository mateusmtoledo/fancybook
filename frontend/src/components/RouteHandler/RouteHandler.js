import { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import RoutesWithoutUser from './RoutesWithoutUser';
import RoutesWithUser from './RoutesWithUser';

function RouteHandler() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      {user ? <RoutesWithUser /> : <RoutesWithoutUser />}
    </BrowserRouter>
  );
}

export default RouteHandler;

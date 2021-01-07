import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
  const [loggedin, setLoggedIn]=useContext(UserContext)
  return (
    <div>
      <Route
        {...rest}
        render={({ location }) =>
          loggedin.email ? (
            children
          ) : (
              <Redirect
                to={{
                  pathname: "/auth",
                  state: { from: location }
                }}
              />
            )
        }
      />
    </div>
  );
};

export default PrivateRoute;
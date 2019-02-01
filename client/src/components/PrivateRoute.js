import React from 'react';
//import { checkJWT } from '../utils/checkJWT';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
       localStorage.getItem('token') 
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/authenticate', state: { from: props.location } }} />
    )} />
)

export default PrivateRoute;
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'views/Home';
import Login from 'views/Login';
import NotFound from 'views/NotFound';
import Admin from 'views/Admin';

const publicPath = '/';

export const routeCodes = {
  HOME: publicPath,
  LOGIN: `${ publicPath }login`,
  ADMIN: `${ publicPath }admin`,
  //ABOUT: `${ publicPath }about`,
};

export default () => (
  <Switch>
    <Route exact path={ publicPath } component={ Home } />
    <Route path={ routeCodes.LOGIN } component={ Login } />
    <Route path={ routeCodes.ADMIN } component={ Admin } />
    <Route path='*' component={ NotFound } />
  </Switch>
);

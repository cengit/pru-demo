// import Page1 from '../container/Page1';
// import Page2 from '../container/Page2';
import { UserList, LogCall, SingleContact } from '@test-demo/ui';
import { App } from '../app';
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createHashHistory } from 'history';
const history = createHashHistory();

class RouterConfig extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/user-list" />} />
          <Route path="/user-list" component={App} />
          <Route path="/single-contact/:id" component={SingleContact} />
          <Route path="/log-call/:id" component={LogCall} />
        </Switch>
      </Router>
    );
  }
}
export default RouterConfig;

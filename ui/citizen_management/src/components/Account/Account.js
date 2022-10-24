import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../Account/SignIn';
import SignUp from '../Account/SignUp';
import { routingPaths } from '../../stores/routingStore';

export default class Account extends React.Component {
  render() {
    return (
      <div>
        <div className="App">
          <div className="appAside" />
          <div className="appForm">
            <Switch>
              <Route path={routingPaths.signUp} component={SignUp} />
              <Route path={routingPaths.signIn} component={SignIn} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import { observer } from 'mobx-react';
import { Route, Switch, withRouter } from 'react-router-dom';

import AboutUs from '../AboutUs';
import Account from '../Account/Account';
import Contact from '../Contact/Contact.js';
import AlertCustom from '../Alert';
import Header from '../Header';
import LeftSideBar from '../LeftSideBar';
import Home from '../Home';
import Household from '../Household';
import HouseholdDetail from '../HouseholdDetail';
import ContributionMoney from '../MoneyManagement/ContributionMoney';
import PeriodMoney from '../MoneyManagement/PeriodMoney';
import MoneyDetail from '../MoneyManagement/MoneyDetail';
import People from '../People';
import PersonDetail from '../PeopleDetail';
import UnAuthorizedPage from '../401Page';
import NotFoundPage from '../404Page';

import commonStore from '../../stores/commonStore';
import { routingPaths } from '../../stores/routingStore';
import userStore from '../../stores/userStore';
import './styles.css';

class App extends React.Component {
  getUnAuthorizedPage() {
    return (
      <Switch>
        <Route exact path={routingPaths.home} component={Home} />
        <Route path={routingPaths.contactUs} component={Contact} />
        <Route
          path={routingPaths.about}
          component={AboutUs}
        />
        <Route exact path={routingPaths.people} component={UnAuthorizedPage} />
        <Route path={routingPaths.personDetail} component={UnAuthorizedPage} />
        <Route
          exact
          path={routingPaths.households}
          component={UnAuthorizedPage}
        />
        <Route
          path={routingPaths.householdDetail}
          component={UnAuthorizedPage}
        />
        <Route
          exact
          path={routingPaths.periodMoney}
          component={UnAuthorizedPage}
        />
        <Route
          exact
          path={routingPaths.contributionMoney}
          component={UnAuthorizedPage}
        />
        <Route path={routingPaths.moneyDetail} component={UnAuthorizedPage} />
        <Route path={routingPaths.account} component={Account} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }

  getAuthorizedPage() {
    return (
      <Switch>
        <Route exact path={routingPaths.home} component={Home} />
        <Route path={routingPaths.contactUs} component={Contact} />
        <Route
          path={routingPaths.about}
          component={AboutUs}
        />
        <Route exact path={routingPaths.people} component={People} />
        <Route path={routingPaths.personDetail} component={PersonDetail} />
        <Route exact path={routingPaths.households} component={Household} />
        <Route
          path={routingPaths.householdDetail}
          component={HouseholdDetail}
        />
        <Route exact path={routingPaths.periodMoney} component={PeriodMoney} />
        <Route
          exact
          path={routingPaths.contributionMoney}
          component={ContributionMoney}
        />
        <Route path={routingPaths.moneyDetail} component={MoneyDetail} />
        <Route path={routingPaths.account} component={NotFoundPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }

  componentDidMount() {
    userStore.getUserDetail();
  }

  render() {
    let size = commonStore.isFullSize ? ' full' : '';
    if (userStore.isSignIn) userStore.renderSignInAlert();
    if (userStore.isSignUp) userStore.renderSignUpAlert();
    if (userStore.isSignOut) userStore.renderSignOutAlert();

    return (
      <div>
        <AlertCustom />
        <LeftSideBar />
        <Header />
        <div className={'page-wrapper' + size}>
          {userStore.userDetail && this.getAuthorizedPage()}
          {!userStore.userDetail && this.getUnAuthorizedPage()}
        </div>
      </div>
    );
  }
}

export default withRouter(observer(App));

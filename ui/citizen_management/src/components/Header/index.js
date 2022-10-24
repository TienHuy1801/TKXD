import React from 'react';
import {
  Nav,
  NavBtn,
  NavLink,
  Bars,
  NavMenu,
  NavBtnLink,
} from './navbarElements';
import NotificationBadge from './NotificationBadge';
import { routingPaths } from '../../stores/routingStore';
import userStore from '../../stores/userStore';
import Quicksearch from './QuickSearch';
import { observer } from 'mobx-react';

class Header extends React.Component {
  render() {
    return (
      <div>
        <Nav>
          <Quicksearch />
          <Bars />
          <NavMenu>
            <NavLink to={routingPaths.about}>Về chúng tôi</NavLink>
            <NavLink to={routingPaths.contactUs}>Liên hệ</NavLink>
          </NavMenu>
          {!userStore.userDetail && (
            <React.Fragment>
              <NavBtn>
                <NavBtnLink to={routingPaths.signIn}>Đăng nhập</NavBtnLink>
              </NavBtn>
              <NavBtn>
                <NavBtnLink to={routingPaths.signUp}>Đăng ký</NavBtnLink>
              </NavBtn>
            </React.Fragment>
          )}
          {userStore.userDetail && <NotificationBadge />}
        </Nav>
      </div>
    );
  }
}

export default observer(Header);

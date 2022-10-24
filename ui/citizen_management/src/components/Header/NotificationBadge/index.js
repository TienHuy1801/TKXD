import React from 'react';
import Profile from './Profile';
import { NavMenu } from '../navbarElements';
import HeaderBtn from './HeaderBtn';
import Notification from './Notification';
import SettingMenu from './SettingMenu';
import './styles.css';

class NotificationBadge extends React.Component {
  render() {
    return (
      <NavMenu>
        <HeaderBtn View={Notification} symbol="fas fa-bell fa-lg" />
        <Profile />
        <HeaderBtn View={SettingMenu} symbol="fas fa-caret-down fa-lg" />
      </NavMenu>
    );
  }
}

export default NotificationBadge;

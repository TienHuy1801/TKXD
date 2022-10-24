import React from 'react';
import { observer } from 'mobx-react';
import userStore from '../../../../stores/userStore';
import {
  SettingMenuLink,
  Menu,
  SettingMenuLabel,
  SettingMenuIcon,
} from './menuElement';

class SettingMenu extends React.Component {
  render() {
    return (
      <div className={'header-right-box' + this.props.active}>
        <Menu>
          <SettingMenuLink to={'/settings'}>
            <SettingMenuIcon>
              <i class="fas fa-cog"></i>
            </SettingMenuIcon>
            <SettingMenuLabel>Cài đặt</SettingMenuLabel>
          </SettingMenuLink>
          <SettingMenuLink to={'/help'}>
            <SettingMenuIcon>
              <i class="fas fa-question-circle"></i>
            </SettingMenuIcon>
            <SettingMenuLabel>Trợ giúp và hỗ trợ</SettingMenuLabel>
          </SettingMenuLink>
          <SettingMenuLink to={'/security'}>
            <SettingMenuIcon>
              <i class="fas fa-book"></i>
            </SettingMenuIcon>
            <SettingMenuLabel>Chính sách bảo mật</SettingMenuLabel>
          </SettingMenuLink>
          <SettingMenuLink
            to="/sign-out"
            onClick={userStore.signOut.bind(userStore)}
          >
            <SettingMenuIcon>
              <i class="fas fa-sign-out-alt"></i>
            </SettingMenuIcon>
            <SettingMenuLabel>Đăng xuất</SettingMenuLabel>
          </SettingMenuLink>
        </Menu>
        {/* <button onClick={userStore.signOut.bind(userStore)}>Sign out</button> */}
      </div>
    );
  }
}

export default observer(SettingMenu);

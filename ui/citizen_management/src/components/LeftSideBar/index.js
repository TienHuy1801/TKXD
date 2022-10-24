import React from 'react';
import Logo from './Logo';
import {
  SideBar,
  SideBarMenu,
  SideBarLink,
  SideBarLabel,
  SideBarIcon,
  SideBarTag,
} from './leftSideBarElement';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import commonStore from '../../stores/commonStore';
import { routingPaths } from '../../stores/routingStore';
import userStore from '../../stores/userStore';

class LeftSideBar extends React.Component {
  render() {
    const size = commonStore.isFullSize;

    return (
      <SideBar size={size}>
        <Logo />
        <SideBarMenu size={size}>
          <SideBarLink exact size={size} to={routingPaths.home}>
            <SideBarIcon>
              <i class="fas fa-columns fa-lg"></i>
            </SideBarIcon>
            <SideBarLabel size={size}>Trang chủ</SideBarLabel>
          </SideBarLink>
          {userStore.userDetail && (
            <React.Fragment>
              {!size && <SideBarTag>Nhân Khẩu</SideBarTag>}
              {size && <hr />}
              <SideBarLink exact size={size} to={routingPaths.people}>
                <SideBarIcon>
                  <i class="fas fa-users fa-lg"></i>
                </SideBarIcon>
                <SideBarLabel size={size}>Quản Lí Nhân Khẩu</SideBarLabel>
              </SideBarLink>
              {!size && <SideBarTag>Hộ Khẩu</SideBarTag>}
              {size && <hr />}
              <SideBarLink exact size={size} to={routingPaths.households}>
                <SideBarIcon>
                  <i class="fas fa-home fa-lg"></i>
                </SideBarIcon>
                <SideBarLabel size={size}>Quản Lí Hộ Khẩu</SideBarLabel>
              </SideBarLink>
              {!size && <SideBarTag>Tiền Thu Phí, Đóng Góp</SideBarTag>}
              {size && <hr />}
              <SideBarLink size={size} to={routingPaths.periodMoney}>
                <SideBarIcon>
                  <i class="fas fa-money-bill-wave fa-lg"></i>
                </SideBarIcon>
                <SideBarLabel size={size}>Quản Lí Tiền Thu Phí</SideBarLabel>
              </SideBarLink>
              <SideBarLink size={size} to={routingPaths.contributionMoney}>
                <SideBarIcon>
                  <i class="fas fa-donate fa-lg"></i>
                </SideBarIcon>
                <SideBarLabel size={size}>Quản Lí Tiền Đóng Góp</SideBarLabel>
              </SideBarLink>
            </React.Fragment>
          )}
        </SideBarMenu>
      </SideBar>
    );
  }
}

export default withRouter(observer(LeftSideBar));

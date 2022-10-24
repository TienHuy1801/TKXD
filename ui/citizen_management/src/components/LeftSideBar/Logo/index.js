import React from 'react';
import { observer } from 'mobx-react';
import { SideBarLogo } from '../leftSideBarElement';
import commonStore from '../../../stores/commonStore';
import Hamburger from 'hamburger-react';
import logo from './logo.png';
import { routingPaths } from '../../../stores/routingStore';
import './styles.css';

class Logo extends React.Component {
  render() {
    return (
      <div className="sidebar-header">
        <SideBarLogo exact to={routingPaths.home} size={commonStore.isFullSize}>
          <img src={logo} alt="homepage" />
        </SideBarLogo>
        <div className="toggle-btn">
          <Hamburger
            className="toggle-btn"
            type="elastic"
            toggled={!commonStore.isFullSize}
            toggle={commonStore.toggleLeftSideBarView.bind(commonStore)}
          />
        </div>
      </div>
    );
  }
}

export default observer(Logo);

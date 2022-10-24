import React from 'react';
import userStore from '../../../../stores/userStore';
import { observer } from 'mobx-react';
import default_avatar from './default_avatar.jpg'
import './styles.css';

class Profile extends React.Component {
  render() {
    return (
      <div className="profile">
        <div className="avatar">
          <img src={default_avatar} alt="default-avatar" />
        </div>
        <p className="name">{userStore.userDetail.fullname}</p>
      </div>
    );
  }
}

export default observer(Profile);

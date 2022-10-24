import React from 'react';
import { observer } from 'mobx-react';

class Notification extends React.Component {
  render() {
    return (
      <div className={'header-right-box' + this.props.active}>
        Hiện không có thông báo nào
      </div>
    );
  }
}

export default observer(Notification);

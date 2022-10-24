import React from 'react';
import './styles.css';
import Chart from './Chart';
import { userData } from './userData';
import userStore from '../../stores/userStore';
import Infor from './Infor';

class Home extends React.Component {
  render() {
    if (!userStore.userDetail) return (
      <div className='no-login'>
      </div>
    );

    return (
      <div className="home">
        <Infor />
        <Chart
          data={userData}
          title="Biến động nhân khẩu"
          dataKey="Số lượng"
          grid
        />
      </div>
    );
  }
}

export default Home;

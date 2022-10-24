import React from 'react';
import Detail from './Detail';

export default function Infor() {
  return (
    <div>
      <div className="home-paper">
        <div className="home-item">
          <Detail
            img={'fas fa-users fa-lg'}
            title={'Nhân khẩu có trên địa bàn'}
            quantum={1824}
          />
        </div>
        <div className="home-item">
          <Detail
            img={'fas fa-home fa-lg'}
            title={'Hộ khẩu có trên địa bàn'}
            quantum={427}
          />
        </div>
      </div>
      <div className="home-now">
        <div className="home-item">
          <Detail
            img={'fas fa-street-view fa-2x'}
            title={'Nhân khẩu tạm trú'}
            quantum={235}
          />
        </div>
        <div className="home-item">
          <Detail
            img={'fas fa-user-minus fa-lg'}
            title={'Nhân khẩu tạm vắng'}
            quantum={643}
          />
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default class UnAuthorizedPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="gif">
          <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
        </div>
        <div className="content">
          <h1 className="main-heading">401</h1>
          <p className="message">
            ...có vẻ như bạn bị từ chối quyền truy cập.
          </p>
          <Link to="/" className="main-link">
            Trang chủ
          </Link>
        </div>
      </div>
    );
  }
}

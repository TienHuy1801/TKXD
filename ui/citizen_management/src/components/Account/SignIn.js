import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { routingPaths } from '../../stores/routingStore';
import userStore from '../../stores/userStore';
import { observer } from 'mobx-react';
import './styles.css';

class SignIn extends Component {
  render() {
    return (
      <div className="formCenter">
        <form className="formFields">
          <div className="formField">
            <label className="formFieldLabel" htmlFor="username">
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              className="formFieldInput"
              placeholder="Nhập tên đăng nhập"
              name="username"
              value={userStore.options.username}
              onChange={userStore.handleInputChange.bind(userStore)}
              required
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Nhập mật khẩu"
              name="password"
              value={userStore.options.password}
              onChange={userStore.handleInputChange.bind(userStore)}
              required
            />
          </div>
        </form>
        <div className="formField submit-btn">
          <button
            className="formFieldButton"
            onClick={userStore.signIn.bind(userStore)}
          >
            Đăng nhập
          </button>
          <br />
          hoặc
          <br />
          <Link to={routingPaths.signUp} className="formFieldLink">
            Tạo tài khoản
          </Link>
        </div>
      </div>
    );
  }
}

export default observer(SignIn);

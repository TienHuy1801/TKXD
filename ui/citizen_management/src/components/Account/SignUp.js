import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { routingPaths } from '../../stores/routingStore';
import userStore from '../../stores/userStore';
import { observer } from 'mobx-react';
import './styles.css';

class SignUp extends Component {
  render() {
    return (
      <div className="formCenter">
        <form className="formFields">
          <div className="formField">
            <label className="formFieldLabel" htmlFor="name">
              Họ và Tên
            </label>
            <input
              type="text"
              id="name"
              className="formFieldInput"
              placeholder="Nhập họ và tên"
              name="fullname"
              value={userStore.options.fullname}
              onChange={userStore.handleInputChange.bind(userStore)}
              required
            />
          </div>
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
          <div className="formField">
            <label className="formFieldLabel" htmlFor="re-password">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              id="re-password"
              className="formFieldInput"
              placeholder="Nhập mật khẩu"
              name="rePassword"
              value={userStore.options.rePassword}
              onChange={userStore.handleInputChange.bind(userStore)}
              required
            />
          </div>
          <div className="formField">
            <label className="formFieldCheckboxLabel">
              <input
                className="formFieldCheckbox"
                type="checkbox"
                name="hasAgreed"
                value={userStore.options.hasAgreed}
                onChange={userStore.handleInputChange.bind(userStore)}
                required
              />{' '}
              Tôi đồng ý với các{' '}
              <a href="null" className="formFieldTermsLink">
                điều khoản dịch vụ
              </a>
            </label>
          </div>
        </form>
        <div className="formField submit-btn">
          <button
            className="formFieldButton"
            onClick={userStore.signUp.bind(userStore)}
          >
            Đăng ký
          </button>
          <Link to={routingPaths.signIn} className="formFieldLink">
            Đã có tài khoản
          </Link>
        </div>
      </div>
    );
  }
}
export default observer(SignUp);

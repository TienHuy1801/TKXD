import React, { Component } from 'react';
import './styles.css';
import a from './1.png';
import b from './2.png';
import c from './3.png';
import d from './4.png';
import e from './5.png';
import boss from './6.png';

export default class AboutUs extends Component {
  render() {
    return (
      <div>
        <section id="team" className="team team-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 bonus">
                <div className="member d-flex align-items-start">
                  <div className="pic">
                    <img src={boss} className="img-fluid" alt="avatar" />
                  </div>
                  <div className="member-info">
                    <p className="member-heading">TS. Trần Nhật Hoá</p>
                    <span>Giảng viên</span>
                    <p className="member-para">Nhập môn Công nghệ phần mềm</p>
                    <div className="social">
                      <a
                        href="https://www.facebook.com/profile.php?id=100004141741992"
                        target="_blank"
                      >
                        <i className="fab fa-facebook-f team-icon"></i>
                      </a>
                      <a href="">
                        <i className="fab fa-instagram team-icon"></i>
                      </a>
                      <a href="">
                        <i className="fab fa-linkedin-in team-icon"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <hr />

              <div className="col-lg-6">
                <div className="member d-flex align-items-start">
                  <div className="pic">
                    <img src={e} className="img-fluid" alt="avatar" />
                  </div>
                  <div className="member-info">
                    <p className="member-heading">Vũ Minh Hiếu</p>
                    <span>20194032</span>
                    <p className="member-para">Khoa học máy tính 05 K64</p>
                    <div className="social">
                      <a
                        href="https://www.facebook.com/profile.php?id=100007103739875"
                        target="_blank"
                      >
                        <i className="fab fa-facebook-f team-icon"></i>
                      </a>
                      <a href="">
                        <i className="fab fa-instagram team-icon"></i>
                      </a>
                      <a href="">
                        <i className="fab fa-linkedin-in team-icon"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mt-4 mt-lg-0">
                <div className="member d-flex align-items-start">
                  <div className="pic">
                    <img src={d} className="img-fluid" alt="avatar" />
                  </div>
                  <div className="member-info">
                    <p className="member-heading">Đào Nguyễn Tiến Huy</p>
                    <span>20194077</span>
                    <p className="member-para">Khoa học máy tính 01 K64</p>
                    <div className="social">
                      <a
                        href="https://www.facebook.com/huy1801"
                        target="_blank"
                      >
                        <i className="fab fa-facebook-f team-icon"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/tienhuy180101/"
                        target="_blank"
                      >
                        <i className="fab fa-instagram team-icon"></i>
                      </a>
                      <a href="">
                        <i className="fab fa-linkedin-in team-icon"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mt-4">
                <div className="member d-flex align-items-start">
                  <div className="pic">
                    <img src={a} className="img-fluid" alt="avatar" />
                  </div>
                  <div className="member-info">
                    <p className="member-heading">Nguyễn Quang Linh</p>
                    <span>20194092</span>
                    <p className="member-para">Khoa học máy tính 05 K64</p>
                    <div className="social">
                      <a
                        href="https://www.facebook.com/alune.304s"
                        target="_blank"
                      >
                        <i className="fab fa-facebook-f team-icon"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/tl_alune/"
                        target="_blank"
                      >
                        <i className="fab fa-instagram team-icon"></i>
                      </a>
                      <a href="">
                        <i className="fab fa-linkedin-in team-icon"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mt-4">
                <div className="member d-flex align-items-start">
                  <div className="pic">
                    <img src={b} className="img-fluid" alt="avatar" />
                  </div>
                  <div className="member-info">
                    <p className="member-heading">Nguyễn Hoàng Phi</p>
                    <span>20190061</span>
                    <p className="member-para">Khoa học máy tính 05 K64</p>
                    <div className="social">
                      <a
                        href="https://www.facebook.com/hoangphi.chv"
                        target="_blank"
                      >
                        <i className="fab fa-facebook-f team-icon"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/nghgphi/"
                        target="_blank"
                      >
                        <i className="fab fa-instagram team-icon"></i>
                      </a>
                      <a href="">
                        <i className="fab fa-linkedin-in team-icon"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mt-4 bonus">
                <div className="member d-flex align-items-start">
                  <div className="pic">
                    <img src={c} className="img-fluid" alt="" />
                  </div>
                  <div className="member-info">
                    <p className="member-heading">Tạ Hữu Đăng</p>
                    <span>20194010</span>
                    <p className="member-para">Khoa học máy tính 05 K64</p>
                    <div className="social">
                      <a
                        href="https://www.facebook.com/dangtahuu"
                        target="_blank"
                      >
                        <i className="fab fa-facebook-f team-icon"></i>
                      </a>
                      <a href="">
                        <i className="fab fa-instagram team-icon"></i>
                      </a>
                      <a href="">
                        <i className="fab fa-linkedin-in team-icon"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

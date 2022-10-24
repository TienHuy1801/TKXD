import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { alertService } from '../Alert/alert.service.js';
import axios from 'axios';
import './styles.css';

const Contact = () => {
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    alertService.success(
      'Phản hồi đã được gửi! Cảm ơn ý kiến đóng góp của bạn'
    );
    setLoader(false);
  };

  return (
    <form className="contact-body">
      <div className="contact-section">
        <div className="contact-info">
          <div>
            <FaMapMarkerAlt className="fas fa-map-marker-alt" />
            Nhập môn Công nghệ phần mềm, HUST
          </div>
          <div>
            <FaEnvelope className="fas fa-envelop" />
            software_engineering@gmail.com
          </div>
          <div>
            <FaPhone className="fas fa-phone" />
            +84 944 567 890
          </div>
          <div>
            <FaClock className="fas fa-clock" />
            Thứ 2 - Thứ 6, 8h00 - 17h00
          </div>
        </div>
        <div className="contact-form">
          <h2>Liên hệ với chúng tôi</h2>
          <form className="contact" action="" method="post">
            <input
              type="text"
              name="name"
              className="text-box"
              placeholder="Họ và Tên"
              required
            />
            <input
              type="email"
              name="email"
              className="text-box"
              placeholder="Địa chỉ Email"
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Phản hồi của bạn"
              required
            />
            <input
              type="submit"
              name="submit"
              className="send-btn"
              value="GỬI"
              onClick={(e) => handleSubmit(e)}
            />
          </form>
        </div>
      </div>
    </form>
  );
};

export default Contact;

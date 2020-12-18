import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

function Footer(props) {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row-footer">
            <div className="column-footer madeby">
              <h3 className="footer__heading">Made by</h3>
              <ul className="footer-list made-by">
                <li className="footer-item">
                  <Link to="/" className="footer-item__link">
                    Bùi Văn Hiếu
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-item__link">
                    Đỗ Hải Nam
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-item__link">
                    Nguyễn Xuân Nguyên
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-item__link">
                    Phùng Thế Hùng
                  </Link>
                </li>
              </ul>
            </div>

            <div className="column-footer">
              <h3 className="footer__heading">Location</h3>
              <ul className="footer-list">
                <li className="footer-item">
                  <Link to="/" className="footer-item__link">
                    <i className="fas fa-map-marker-alt"></i> Cơ sở 1, trụ sở chính:
                    Tầng 6, toà C, 22 Thành Công, Hà Nội
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-item__link">
                    <i className="fas fa-map-marker-alt"></i> Cơ sở 2: Tầng 2, 29T1
                    Hoàng Đạo Thuý, Hà Nội
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-item__link">
                    <i className="fas fa-map-marker-alt"></i> Cơ sở 3: Tầng 6, 107
                    Nguyễn Phong Sắc, Hà Nội
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-item__link">
                    <i className="fas fa-map-marker-alt"></i> Cơ sở 4: Tầng 5, 71
                    Nguyễn Chí Thanh, Hà Nội (trụ sở chính)
                  </Link>
                </li>
              </ul>
            </div>
            <div className="column-footer contact">
              <h3 className="footer__heading">Contact with us</h3>
              <ul className="footer-list">
                <li className="footer-item">
                  <Link to="/" className="footer-item__link">
                    <i className="fab fa-facebook-square"></i> FaceBook
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-item__link">
                    <i className="fab fa-instagram"></i> Instagram
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-item__link">
                    <i className="fab fa-youtube"></i> Youtube
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>© 2020 - bản quyền thuộc về abcxyz </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;

import React from "react";
import ErrorPage from "../../../components/ErrorPage";
import { Link } from "react-router-dom";
import "./style.scss";
function UserInfor({ user }) {
  return (
    <>
      {user && (
        <div className="box-infor">
          <h3 className="title">Thông Tin Cá Nhân</h3>
          <div className="content">
            <div className="avatar">
              <img src={user.avatar} alt="logo" />
            </div>
            <div className="input-upload">
              <input type="file" />
            </div>
            <p>
              <span className="infor"> UserName:</span>{" "}
              <span>{user.userName}</span>
            </p>
            <p>
              <span className="infor"> Email: </span>
              <span>{user.email}</span>
            </p>
            <p>
              <span className="infor">tài khoản:</span> <span>Member</span>
            </p>

            <div className="change-password">
              <Link to="/member/change-password">Đổi mật khẩu</Link>
            </div>
          </div>
        </div>
      )}

      {!user && <ErrorPage />}
    </>
  );
}

export default UserInfor;

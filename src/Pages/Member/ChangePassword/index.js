import React, { useState } from "react";
import Input from "../../../components/Input";
import "./style.scss";
function ChangePassword(props) {
  const [value, setValue] = useState({
    currentPassword: "",
    newPassword: "",
    comfirmPassword: "",
  });
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="form-password">
      <div className="title">
        <h3>Change Password</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            label=" Current Password"
            name="currentPassword"
            type="password"
            value={value.currentPassword}
            onChange={handleChange}
            // onBlur={validate}
            showPassword={true}
          />
        </div>
        <div>
          <Input
            label="New Password"
            name="newPassword"
            type="password"
            value={value.newPassword}
            onChange={handleChange}
            showPassword={true}
          />
        </div>
        <div>
          <Input
            label="Confirm Password"
            name="comfirmPassword"
            type="password"
            value={value.comfirmPassword}
            onChange={handleChange}
            showPassword={true}
          />
        </div>

        <div className="btn">
          <button type="submit">Change Password</button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;

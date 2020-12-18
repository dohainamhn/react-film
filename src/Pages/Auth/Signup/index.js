import React, { useEffect, useState } from "react";
import Input from "../../../components/Input/index";
import { Link } from "react-router-dom";
import userApi from "../../../api/userApi";
import "../style.scss";

function Signup(props) {
  const [value, setValue] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [err, setErr] = useState({
    isErr: false,
    nameErr: "",
  });
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    validate("email", true);
    validate("password", true);
    validate("confirmPassword", true);
    if (!err.isErr) {
      try {
        await userApi.signUp({
          userName: value.userName,
          password: value.password,
          email: value.email,
        });

        setSuccessMessage("You have registered successfully");
      } catch (err) {
        console.log(err.response);
        setErr({
          isErr: true,
          nameErr: err.response.data.message,
        });
      }
    }
  };

  const validate = (name, submit = false) => {
    if (!submit) {
      setErr({
        ...err,
        isErr: false,
        nameErr: "",
      });
    }

    if (name === "email") {
      let checkRegex = /^[a-z][a-z0-9_]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gim;
      if (!checkRegex.test(value.email)) {
        setErr({
          ...err,
          isErr: true,
          nameErr: "cú pháp email không hợp lệ",
        });
      }
      return;
    } else if (name === "password") {
      if (value.password.length < 6 || value.password.trim() === "") {
        setErr({
          ...err,
          isErr: true,
          nameErr: "password quá ngắn",
        });
        return;
      }
    } else if (name === "confirmPassword") {
      if (value.confirmPassword !== value.password) {
        setErr({
          ...err,
          isErr: true,
          nameErr: "confirmPassword không trùng nhau",
        });
        return;
      }
    }
  };
  const handle = (e) => {
    validate(e.target.name);
  };
  useEffect(() => {
    console.log(err);
  }, [err]);

  // const test = (e) => {
  //   let b = e.target.parentElement.firstChild.firstChild.type;
  //   console.log(b);
  //   // e.target.parentElement.childNodes[0].setAttribute("type", "text");
  //   e.target.parentElement.firstChild.firstChild.type = b === "text" ? "password" : "text";
  // };

  return (
    <div className="container__auth">
      <div className="logo">
        <img src="https://i.imgur.com/lGh30No.png" alt="logo" />
      </div>

      {err.isErr && (
        <div className="err">
          <p>{err.nameErr}</p>
        </div>
      )}
      {successMessage && (
        <div className="success">
          <p>{successMessage}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="container-input">
          <Input
            label="User Name"
            name="userName"
            type="value"
            value={value.userName}
            onChange={handleChange}
            onBlur={handle}
          />
        </div>
        <div className="container-input">
          <Input
            label="Email"
            name="email"
            type="value"
            value={value.email}
            onChange={handleChange}
            onBlur={handle}
          />
        </div>
        <div className="container-input">
          <Input
            label="Password"
            name="password"
            type="password"
            value={value.password}
            onChange={handleChange}
            onBlur={handle}
            showPassword={true}
          />
        </div>
        <div className="container-input">
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={value.confirmPassword}
            onChange={handleChange}
            onBlur={handle}
            showPassword={true}
          />
        </div>
        <div className="btn">
          <button type="submit">Register</button>
        </div>
        <div>
          <p className="redirect">
            Bạn Có Tài Khoản?
            <Link className="redirect__auth" to="/auth/sign-in">
              Đăng Nhập
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;

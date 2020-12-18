import React, { useContext, useEffect, useState } from "react";
import Input from "../../../components/Input/index";
import userApi from "../../../api/userApi";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import "../style.scss";

function Signin(props) {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    handleValidate("email", true);
    handleValidate("password", true);
    if (!err) {
      try {
        let response = await userApi.signIn({
          email: value.email,
          password: value.password,
        });
        console.log(response.data);

        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
      } catch (err) {
        console.log(err.response);
        setErr(err.response.data.message);
      }
    }
  };
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);
  const handleValidate = (name, submit = false) => {
    if (!submit) {
      setErr(null);
    }
    if (name === "email") {
      let checkRegex = /^[a-z][a-z0-9_]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gim;
      if (!checkRegex.test(value.email)) {
        setErr("Email is not valid");
      }
    }
    if (name === "password" && value.password.length < 6) {
      setErr("Password can not be less than 6 character");
    }
  };
  const validate = (e) => {
    handleValidate(e.target.name);
  };
  return (
    <div style={{ height: "400px" }} className="container__auth">
      <div className="logo">
        <img src="https://i.imgur.com/lGh30No.png" alt="logo" />
      </div>
      {err && (
        <div style={{ marginTop: "30px" }} className="err">
          <p>{err}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            label="Email"
            name="email"
            type="value"
            value={value.email}
            onChange={handleChange}
            onBlur={validate}
          />
        </div>
        <div>
          <Input
            label="Password"
            name="password"
            type="password"
            value={value.password}
            onChange={handleChange}
            onBlur={validate}
            showPassword={true}
          />
        </div>

        <div className="btn">
          <button type="submit">Login</button>
        </div>
        <div>
          <p className="redirect">
            Chưa Có Tài Khoản?
            <Link className="redirect__auth" to="/auth/sign-up">
              Đăng Kí
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signin;

import React, { useEffect } from "react";
import "./Login.scss";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CgLock } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../functions/reques";
import { loginCall } from "../redux/functions/loginCall";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const Login = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShow = () => {
    setShow(!show);
  };

  const handleInputs = (e) => {
    let name = e.target.name;
    setUser((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleLogin = () => {
    if (user.username != "") {
      if (user.password != "" && user.password.length >= 8) {
        loginCall(
          {
            firstName: user.username,
            pass: user.password,
          },
          dispatch,
          navigate
        );
      } else {
        toast.error("password should be more than 8 in length!");
      }
    } else {
      toast.error("username should not be empty!");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <div className="login">
        <div className="login__title">Welcome back 👋</div>
        <div className="login__form">
          <div className="login__form__item">
            <div className="login__form__item__title">
              <CgProfile />
              <p>username:</p>
            </div>
            <div className="login__form__item__input">
              <input
                type="text"
                placeholder="ig:amir..."
                name="username"
                onChange={(e) => handleInputs(e)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </div>
          </div>
          <div className="login__form__item">
            <div className="login__form__item__title">
              <CgLock />
              <p>password:</p>
            </div>
            <div className="login__form__item__input">
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="password"
                onChange={(e) => handleInputs(e)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <div
                className="login__form__item__input__icon"
                onClick={() => handleShow()}
              >
                {show ? <LuEye /> : <LuEyeClosed />}
              </div>
            </div>
          </div>
          <div
            to={"/"}
            className="login__form__btn"
            onClick={() => handleLogin()}
          >
            Login
          </div>
          <span>
            You don't have an account? <Link to="/signup">join now</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;

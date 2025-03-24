import React from "react";
import { CgLock, CgProfile } from "react-icons/cg";
import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { request } from "../../functions/reques";
import "./SignUp.scss";
import { loginCall } from "../../redux/functions/loginCall";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    pass: "",
  });

  const handleShow = () => {
    setShow(!show);
  };

  const handleInputs = (e) => {
    let name = e.target.name;
    setUser((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSignUp = () => {
    if (user.firstName != "") {
      if (user.lastName != "") {
        if (user.pass != "" && user.pass.length >= 8) {
          mutation.mutate(user);
        } else {
          toast.error("password must be longet than 8 charecters");
        }
      } else {
        toast.error("last name must not be empty");
      }
    } else {
      toast.error("first name must not be empty");
    }
  };

  const mutation = useMutation({
    mutationKey: ["signUp"],
    mutationFn: async (data) => {
      const res = request.post("/signup", data);
      return res;
    },
    onSuccess: () => {
      toast.success("Account Created. Welcome Mate...");
      let { lastName, ...other } = user;
      console.log(other);
      loginCall(
        {
          firstName: user.firstName,
          pass: user.pass,
        },
        dispatch,
        navigate
      );
    },
    onError: (e) => {
      if (e.response.data == "username taken..") {
        toast.error("Username is taken..");
      }
      console.log(e);
    },
  });
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleSignUp();
    }
  };

  return (
    <>
      <div className="sign-up">
        <div className="sign-up__title">Lets Make Your Account 😎.</div>
        <div className="sign-up__form">
          <div className="sign-up__form__item">
            <div className="sign-up__form__item__title">
              <CgProfile />
              <p>first name</p>
            </div>
            <div className="sign-up__form__item__input">
              <input
                autoComplete="off"
                type="text"
                placeholder="ig:amir..."
                name="firstName"
                onChange={(e) => handleInputs(e)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </div>
            <span>This will be you username</span>
          </div>
          <div className="sign-up__form__item">
            <div className="sign-up__form__item__title">
              <CgProfile />
              <p>last name</p>
            </div>
            <div className="sign-up__form__item__input">
              <input
                autoComplete="off"
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={(e) => handleInputs(e)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </div>
          </div>
          <div className="sign-up__form__item">
            <div className="sign-up__form__item__title">
              <CgLock />
              <p>password</p>
            </div>
            <div className="sign-up__form__item__input">
              <input
                type={show ? "text" : "password"}
                name="pass"
                placeholder="Your Powerfull Password .."
                onChange={(e) => handleInputs(e)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <div
                className="sign-up__form__item__input__icon"
                onClick={() => handleShow()}
              >
                {show ? <LuEye /> : <LuEyeClosed />}
              </div>
            </div>
          </div>
          <div
            to={"/"}
            className="sign-up__form__btn"
            onClick={() => handleSignUp()}
          >
            Sign Up
          </div>
          <span>
            Already have an account? <Link to="/login">Log in</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default SignIn;

import React from "react";
import "./HomePage.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOG_OUT } from "../../redux/slices/authSlice";
const HomePage = () => {
  const user = useSelector((state) => state.user.currentUser.firstName);
  console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(LOG_OUT());
    navigate("/login");
  };

  return (
    <>
      <div className="home">
        <div className="home__title">Welcome back {user} 👋</div>
        <p>you have been logged in successfully ✅ ...</p>
        <div className="home__logOut" onClick={() => handleLogOut()}>
          Log out!
        </div>
      </div>
    </>
  );
};

export default HomePage;

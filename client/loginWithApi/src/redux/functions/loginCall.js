import { request } from "../../functions/reques.js";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_START,
} from "../slices/authSlice.js";
import { toast } from "react-toastify";

export const loginCall = async (user, dispatch, navigate) => {
  dispatch(LOGIN_START());
  try {
    const res = await request.post("/login", user);

    toast.error(res);
    dispatch(LOGIN_SUCCESS(res.data));
    toast.success("Login Successful");
    navigate("/");
  } catch (error) {
    // console.log({ e: "in error", error });
    toast.error("username or password is worng!");
    dispatch(LOGIN_FAILURE());
    console.log(error);

    // handleError(error);
  }
};

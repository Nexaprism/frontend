import { FC, useEffect } from "react";
import { setIsLoggedIn } from "../app/appReducer";
import { useAppDispatch } from "../hooks";
import { setAvatar, setEmail, setToken, setUserId, setUsername } from "./userReducer";

const UserUpdater: FC = (): null => {
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const expiryDate = localStorage.getItem("expiryDate");
  const avatar = localStorage.getItem("avatar");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const expiryTime = Date.parse(expiryDate!);
  const currentTime = new Date().getTime();
  useEffect(() => {
    if (currentTime < expiryTime) {
      dispatch(setIsLoggedIn(true));
      dispatch(setToken(token));
      dispatch(setUserId(userId));
      if(avatar !== "" && avatar !== null) {
        dispatch(setAvatar(avatar));
      }
      
      dispatch(setEmail(email));
      dispatch(setUsername(username));
    } else {
      dispatch(setToken(""));
      dispatch(setUserId(""));
      dispatch(setAvatar(""));
      dispatch(setUsername(""));
      dispatch(setEmail(""));
      dispatch(setIsLoggedIn(false));
    }
  }, []);

  return null;
};

export default UserUpdater;

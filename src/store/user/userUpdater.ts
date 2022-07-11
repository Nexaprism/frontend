import { FC, useEffect } from "react";
import { setIsLoggedIn } from "../app/appReducer";
import { useAppDispatch } from "../hooks";
import { setToken, setUserId } from "./userReducer";

const UserUpdater: FC = (): null => {
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const expiryDate = localStorage.getItem("expiryDate");
  const expiryTime = Date.parse(expiryDate!);
  const currentTime = new Date().getTime();
  useEffect(() => {
    if (currentTime < expiryTime) {
      dispatch(setIsLoggedIn(true));
      dispatch(setToken(token));
      dispatch(setUserId(userId));
    } else {
      dispatch(setIsLoggedIn(false));
    }
  }, []);

  return null;
};

export default UserUpdater;

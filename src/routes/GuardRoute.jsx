import React from "react";
import { useHistory } from "react-router-dom";
import { useGetAuthUser } from "../repository";
import { Skeleton } from "antd";
import { ROUTE_PATH } from "./index";

const GuardRoute = ({ children }) => {
  const {
    data: user,
    loading: loadingCurrentUser,
    error: errorCurrentUser,
  } = useGetAuthUser();

  const history = useHistory();

  if (loadingCurrentUser) return <Skeleton active />;

  if (errorCurrentUser || !user) {
    history.replace(ROUTE_PATH.LOGIN);
    return null;
  }

  return children;
};

export default GuardRoute;

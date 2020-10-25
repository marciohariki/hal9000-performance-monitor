import React from "react";
import { useHistory } from "react-router-dom";
import { useGetAuthUser } from "../repository";
import { Skeleton } from "antd";

const GuardRoute = ({ children }) => {
  const {
    data: user,
    loading: loadingCurrentUser,
    error: errorCurrentUser,
  } = useGetAuthUser();

  const history = useHistory();

  if (loadingCurrentUser) return <Skeleton active />;

  if (errorCurrentUser || !user) {
    history.replace("/");
    return null;
  }

  return children;
};

export default GuardRoute;

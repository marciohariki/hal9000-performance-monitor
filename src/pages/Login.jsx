import styled from "styled-components";
import { useEffect } from "react";
import { Layout, Skeleton } from "antd";
import { initAuth } from "../repository";

const Login = () => {
  const authContainerId = "auth-container";
  const loaderId = "loader";
  useEffect(() => {
    initAuth(authContainerId, loaderId);
  }, []);

  return (
    <Layout>
      <S.Content>
        <h1>Hal9000 - Performance Monitor</h1>
        <div id={authContainerId} />
        <div id={loaderId}>
          <Skeleton active />
        </div>
      </S.Content>
    </Layout>
  );
};

const S = {
  Content: styled(Layout.Content)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh);
  `,
};

export default Login;

import { Layout } from "antd";
import styled from "styled-components";

const Container = ({ children, ...props }) => (
  <S.Content className="site-layout" {...props}>
    {children}
  </S.Content>
);

const S = {
  Content: styled(Layout.Content)`
    min-height: calc(100vh - 128px);
    padding: 64px;
    margin-top: 64px;
  `,
};

export default Container;

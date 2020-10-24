import { Layout } from "antd";

const Container = ({ children, ...props }) => (
  <Layout.Content
    className="site-layout"
    style={{ padding: "0 50px", marginTop: 64 }}
    {...props}
  >
    {children}
  </Layout.Content>
);

export default Container;

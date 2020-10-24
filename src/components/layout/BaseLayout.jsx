import { Layout } from "antd";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

const BaseLayout = ({ children, props }) => (
  <Layout {...props}>
    <Header />
    <Container>{children}</Container>
    <Footer />
  </Layout>
);

export default BaseLayout;

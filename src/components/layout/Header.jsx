import { Layout, Menu } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { signOut } from "../../repository";
import { ROUTE_PATH } from "../../routes";

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const redirectTo = (path) => {
    return () => history.push(path);
  };
  return (
    <Layout.Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
        <Menu.Item key={ROUTE_PATH.HOME} onClick={redirectTo(ROUTE_PATH.HOME)}>
          Home
        </Menu.Item>
        <Menu.Item
          key={ROUTE_PATH.METRICS}
          onClick={redirectTo(ROUTE_PATH.METRICS)}
        >
          Métricas
        </Menu.Item>
        <Menu.Item
          key={ROUTE_PATH.PEOPLE}
          onClick={redirectTo(ROUTE_PATH.PEOPLE)}
        >
          Pessoas
        </Menu.Item>
        <Menu.Item key={ROUTE_PATH.LOGOUT} onClick={signOut}>
          Logout
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default Header;

import "./App.css";
import { Breadcrumb, Menu, Layout } from "antd";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { HomePage } from "./Pages/Home";
import { AboutPage } from "./Pages/About";

const { Header, Content, Footer } = Layout;

// 主应用组件
function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      key: "home",
      label: "Home",
    },
    {
      key: "about",
      label: "About",
    },
  ];

  const getCurrentKey = () => {
    if (location.pathname === "/home" || location.pathname === "/")
      return "home";
    if (location.pathname === "/about") return "about";
    return "home";
  };

  const getBreadcrumbItems = () => {
    if (location.pathname === "/home" || location.pathname === "/") {
      return [{ title: "Home" }];
    }
    if (location.pathname === "/about") {
      return [{ title: "About" }];
    }
    return [{ title: "Home" }];
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[getCurrentKey()]}
          items={menus}
          className="menu"
          onClick={(e) => {
            navigate(`/${e.key}`);
          }}
        />
      </Header>
      <Content className="content">
        <Breadcrumb className="breadcrumb" items={getBreadcrumbItems()} />
        <div className="content-container">
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()} Created by yl
      </Footer>
    </Layout>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <Navigate to="/home" /> },
        { path: "home", element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

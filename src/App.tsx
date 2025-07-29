import "./App.css";
import { Breadcrumb, Menu, Layout, ConfigProvider } from "antd";
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
import Sider from "antd/es/layout/Sider";
import { useState } from "react";

const { Content, Footer } = Layout;

// 主应用组件
function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const menus = [
    {
      key: "home",
      label: "投资组合",
    },
    {
      key: "about",
      label: "关于",
    },
  ];

  const getBreadcrumbItems = () => {
    if (location.pathname === "/home" || location.pathname === "/") {
      return [{ title: "投资组合分析" }];
    }
    if (location.pathname === "/about") {
      return [{ title: "关于" }];
    }
    return [{ title: "投资组合分析" }];
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: "#fff",
            triggerBg: "#fff",
            triggerColor: "#000",
          },
        },
      }}
    >
      <Layout className="layout" hasSider>
        <Sider
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            defaultSelectedKeys={["home"]}
            mode="inline"
            items={menus}
            onClick={(e) => {
              navigate(`/${e.key}`);
            }}
          />
        </Sider>
        <Layout>
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
      </Layout>
    </ConfigProvider>
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
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

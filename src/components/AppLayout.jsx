import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Layout } from "antd";
import { contentStyle, layoutStyle } from "./style/AppLayoutStyle";
import Footer from "./Footer";

const { Content } = Layout;

const AppLayout = () => {
  return (
    <Layout style={layoutStyle}>
      <Header />
      <Content style={contentStyle}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default AppLayout;

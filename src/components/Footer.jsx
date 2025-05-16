import { Layout } from "antd";
import React from "react";
import { footerStyle } from "./style/AppLayoutStyle";

const Footer = () => {
  const { Footer } = Layout;
  return (
    <Footer style={footerStyle}>
      <p>My Custom Footer © 2025</p>
    </Footer>
  );
};

export default Footer;

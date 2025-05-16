import { NavLink } from "react-router-dom";
import {
  HOME_PATH,
  LOGIN_PATH,
  LOGOUT_PATH,
  MOVIE_PATH,
} from "../routes/paths";
import { Col, Layout, Row } from "antd";

const Header = () => {
  const { Header } = Layout;
  return (
    <Header style={{ background: "#121212" }}>
      <Row justify="start">
        <Col>
          <div style={{ display: "flex", gap: "20px" }}>
            <NavLink to={HOME_PATH}>Home</NavLink>
            <NavLink to={MOVIE_PATH}>Movie</NavLink>
            <NavLink to={LOGIN_PATH}>Log In</NavLink>
            <NavLink to={LOGOUT_PATH}>Log Out</NavLink>
          </div>
        </Col>
      </Row>
    </Header>
  );
};
export default Header;

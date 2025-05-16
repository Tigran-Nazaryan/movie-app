import { Button, Input } from "antd";
import React, { useState } from "react";

const Form = ({ title, handleClick }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="enter your email"
      ></Input>
      <Input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="enter your pass"
      ></Input>
      <Button onClick={() => handleClick(email, pass)}>{title}</Button>
    </div>
  );
};

export default Form;

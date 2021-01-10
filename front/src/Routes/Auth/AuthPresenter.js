import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
`;

const TitleContainer = styled(Box)`
  margin-bottom: 20px;
`;

const Title = styled.span`
  font-size: 30px;
  font-family: "Raleway", sans-serif;
`;

const StateChanger = styled(Box)`
  margin-bottom: 15px;
`;

const Link = styled.span`
  cursor: pointer;
  color: #0652dd;
`;

const Form = styled(Box)`
  form {
    display: flex;
    flex-direction: column;
    padding: 5px 5px;
    margin-bottom: 15px;
    input {
      font-size: 15px;
      margin-bottom: 10px;
    }
    button {
      background-color: #1b9cfc;
      color: white;
      border-radius: 10px;
      padding: 10px 5px;
      font-size: 15px;
    }
  }
`;

export default ({
  action,
  setAction,
  email,
  password,
  password2,
  username,
  phoneNum,
  onSubmit,
}) => (
  <Wrapper>
    <TitleContainer>
      <Title>Linker</Title>
    </TitleContainer>
    <Form>
      {action === "logIn" ? (
        <>
          <Helmet>
            <title>Log In</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Email"} type="email" {...email} />
            <Input placeholder={"Password"} type="password" {...password} />
            <Button text={"Log In"} />
          </form>
        </>
      ) : (
        <>
          <Helmet>
            <title>Sign Up</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Email"} type="email" {...email} />
            <Input placeholder={"UserName"} {...username} />
            <Input placeholder={"PhoneNumber"} {...phoneNum} />
            <Input placeholder={"Password"} type="password" {...password} />
            <Input
              placeholder={"Password for validation"}
              type="password"
              {...password2}
            />
            <Button text={"Sign Up"} />
          </form>
        </>
      )}
    </Form>
    <StateChanger>
      {action === "logIn" ? (
        <>
          Don't you have an account ?
          <Link onClick={() => setAction("signUp")}> Sign Up </Link>
        </>
      ) : (
        <>
          Did you have an account ?
          <Link onClick={() => setAction("logIn")}> Log in </Link>
        </>
      )}
    </StateChanger>
  </Wrapper>
);

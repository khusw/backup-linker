import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOG_IN, SIGN_UP, LOCAL_LOG_IN } from "./AuthQueries";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";
import AuthPresenter from "./AuthPresenter";

export default () => {
  const [action, setAction] = useState("logIn");

  const email = useInput("");
  const password = useInput("");
  const password2 = useInput("");
  const phoneNum = useInput("");
  const username = useInput("");

  const [login] = useMutation(LOG_IN);
  const [createAccount] = useMutation(SIGN_UP);
  const [loginState] = useMutation(LOCAL_LOG_IN);

  let Auth; // mutation result variable
  let token; // token from login or signUp.
  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          Auth = await login({
            variables: { email: email.value, password: password.value },
          }); // AuthPayload object.
          token = Auth.data.login.token;
          if (!Auth) {
            // when login fail
            toast.warn("you need to make your own account");
            setAction("signUp");
          } else {
            // when login success
            console.log("login success");
            toast.success("login success");
            await loginState({
              variables: { token },
            });
          }
        } catch {
          toast.error("login failed!");
        }
      } else {
        toast.error("email is required!", {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        });
      }
    } else if (action === "signUp") {
      if (
        (email.value !== "",
        username.value !== "",
        password.value !== "",
        password2.value !== "",
        phoneNum.value !== "")
      ) {
        try {
          Auth = await createAccount({
            variables: {
              email: email.value,
              username: username.value,
              password: password.value,
              password2: password2.value,
              phoneNum: phoneNum.value,
            },
          });
          token = Auth.data.createAccount.token;
          if (!Auth) {
            toast.warn("you need to sign up first");
            setAction("signUp");
          } else {
            toast.success("login success");
            setAction("logIn");
          }
        } catch {
          toast.error("can't sign up, please check input data");
        }
      } else {
        toast.error("you need to input with vaild data");
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      email={email}
      password={password}
      password2={password2}
      username={username}
      phoneNum={phoneNum}
      onSubmit={onSubmit}
    />
  );
};

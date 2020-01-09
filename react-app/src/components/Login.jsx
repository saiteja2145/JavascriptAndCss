import React, { useState, useContext } from "react";
import axios from "axios";
import { withRouter } from "react-router";

import netgearLogo from "../img/Netgear_logo.png";

import {
  axiosFailureResponseHandler,
  axiosLoginResponseHandler,
  axiosSuccessResponseHandler
} from "../axios/axiosResponseHandler.js";
import InputBox from "./Utils/InputBox";
import { Loader } from "./Utils/Loader";
import { setToken, axiosInstance } from "../axios/axios";
import { ProductIDContext } from "./contextAPI/ProductIDContext";
import { AuthContext } from "./contextAPI/AuthContext";

const Login = props => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const { history } = props;
  const ProductIDContextConsumer = useContext(ProductIDContext);
  const AuthContextConsumer = useContext(AuthContext);
  console.log(ProductIDContextConsumer);  
  const loginHandler = e => {
    e.preventDefault();
    setLoader(true);

    //Login API call
    axios
      .post("/socketCommunication", {
        system: {
          basicSettings: { adminName: userName, adminPasswd: password }
        }
      })
      .then(res => {
        setLoader(false);
        let result = axiosLoginResponseHandler(res, history);
        if (result) {
          if (result.status === 1 && result.data.err_code === 26) {
            setError("Max tries to login exceed");
          } else if (
            result.status === 1 &&
            (result.data.err_code === 26 || result.data.err_code === 110)
          ) {
            setError("Invalid UserName or Password");
          } else if (result.status === 401) {
            setError("Maximum user limit exceded");
          } else if (result.status === 0) {
            setLoader(true);
            //Success Case
            let token = res.headers.security;
            document.cookie = "ssid=" + token;
            setToken();

            //API call for dayzero status
            axiosInstance
              .post("/socketCommunication", {
                system: {
                  basicSettings: { dayZeroStatus: "" }
                }
              })
              .then(res => {
                setLoader(false);
                let err = axiosSuccessResponseHandler(res);
                if (err !== false) {
                  AuthContextConsumer.setLoginStatus(true);
                  //Redirect based on result
                  if (+res.data.system.basicSettings.dayZeroStatus) {
                    history.replace("/dayZero");
                  } else {
                    history.replace("/dashboard");
                  }
                }
              })
              .catch(err => axiosFailureResponseHandler(err));
          }
        }
      })
      .catch(err => axiosFailureResponseHandler(err, history));
  };

  return (
    <div className="loginContainer">
      {loader ? <Loader type="Loading" /> : null}
      {error ? (
        <div className="loginContainer__error">
          <h2 className="loginContainer__error--text">{error}</h2>
          <div className="crossContainer" onClick={() => setError("")}>
            <div className="crossIconLeft"></div>
            <div className="crossIconRight"></div>
          </div>
        </div>
      ) : null}
      <form className="loginContainer__form">
        <div className="logoContainer">
          <img src={netgearLogo} alt="Netgear Logo" className="logo" />
        </div>
        <InputBox
          type="text"
          id="userName"
          label="User Name"
          value={userName}
          setValue={setUserName}
        />
        <InputBox
          type="password"
          id="password"
          label="Password"
          value={password}
          setValue={setPassword}
        />
        <input
          type="submit"
          className="btn"
          value="Login"
          onClick={loginHandler}
        ></input>
      </form>
    </div>
  );
};

export default withRouter(Login);

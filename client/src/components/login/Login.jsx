import React, { useEffect, useState } from "react";
import "./login.scss";

import { AnnouncementApi } from "../../api/api";

const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const ValidateEmail = () => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mailformat.test(formData.email)) {
      return true;
    } else {
      return false;
    }
  };

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!ValidateEmail()) {
      setError("You have entered an invalid email address!");
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }
    AnnouncementApi.adminLogin(formData)
      .then((data) => {
        data.status == 200 && setAuth(true);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("admin", JSON.stringify(data.data.admin));
      })
      .catch((err) => {
        setError(err.response.data.message);
        setTimeout(() => {
          setError("");
        }, 1500);
      });
  };

  return (
    <form className="login" onSubmit={onSubmitHandler}>
      <h2>Sign In</h2>

      <div className="login--group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          onChange={onChangeHandler}
          required
        />
      </div>

      <div className="login--group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          onChange={onChangeHandler}
          required
        />
      </div>
      <button type="submit">Submit</button>
      <div className={error ? "error" : "error hide"}>
        {error && <p>{error}</p>}
      </div>
    </form>
  );
};

export default Login;

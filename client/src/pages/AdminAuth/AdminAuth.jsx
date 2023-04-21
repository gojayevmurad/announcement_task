import React, { useEffect, useState } from "react";
import Login from "../../components/login/Login";
import { AnnouncementApi } from "../../api/api";
import AdminPage from "../AdminPage/AdminPage";

const AdminAuth = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminData = JSON.parse(localStorage.getItem("admin"));
    if (token) {
      AnnouncementApi.adminVerify(token, adminData["_id"])
        .then((res) => {
          console.log("first");
          console.log(res);
          res.status == 200 && setAuth(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAuth(false);
    }
  }, []);

  if (!auth) {
    return <Login admin={true} setAuth={setAuth} />;
  }

  return <AdminPage />;
};

export default AdminAuth;

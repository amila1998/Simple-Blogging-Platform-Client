"use client";

import Signup from "@/components/Signup";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiConfig from "../../../utils/apiConfig";
import { AuthContext } from "@/context/AuthContext";

const RegisterPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState({
    name:"",
    email: "",
    password: "",
  });
  const [rePassword, setRePassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [router, isLoggedIn]);

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.password === rePassword) {
        const res = await apiConfig.baseAPI.post(
          "/api/auth/register",
          { ...user },
          { withCredentials: true }
        );
        toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.push("/auth/signin");
      } else {
        toast.error("Passwords are not matched", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      // window.location.href = "/";
    } catch (err) {
      console.log("🚀 ~ file: page.jsx:51 ~ loginSubmit ~ err:", err);
      if (err.response) {
        toast.error(err.response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <Signup
        user={user}
        setUser={setUser}
        registerSubmit={registerSubmit}
        rePassword={rePassword}
        setRePassword={setRePassword}
      />
    </>
  );
};

export default RegisterPage;

"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiConfig from '../../../utils/apiConfig';


import Signin from "@/components/Signin";
import { GlobalState } from "@/utils/GlobalState";

const SigninPage = () => {
  const router = useRouter();
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [reloadProvider,setReloadProvider] = state.reloadProvider;
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isLogged) {
      router.push('/');
    }
  }, [router,isLogged]);

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(apiConfig.baseAPI);
      const res = await apiConfig.baseAPI.post("/api/auth/signing", { ...user },{ withCredentials: true });
      toast.success(res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setReloadProvider(true)
      localStorage.setItem("firstLogin", true);
      router.push('/')
      // window.location.href = "/";
    } catch (err) {
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
  };
  return (
    <>
      <ToastContainer />
      <Signin user={user} setUser={setUser} loginSubmit={loginSubmit} />
    </>
  );
};

export default SigninPage;

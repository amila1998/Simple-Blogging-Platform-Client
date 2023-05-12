"use client";

import Feed from "@/components/Feed";
import Nav from "@/components/Nav";
import { AuthContext } from "@/context/AuthContext";
import apiConfig from "@/utils/apiConfig";
import { useContext, useEffect } from "react";

const HomePage = () => {
  const { dispatch, token, isLoggedIn, user } = useContext(AuthContext);

  //check first login
  useEffect(() => {
    if (!isLoggedIn) {
      const _appSignging = localStorage.getItem("firstLogin");
      _appSignging
        ? dispatch({ type: "SIGNING" })
        : dispatch({ type: "SIGNOUT" });
    }
  }, [isLoggedIn]);

  // get ac token
  useEffect(() => {
    if (isLoggedIn) {
      const getToken = async () => {
       try {
        const res = await apiConfig.baseAPI.post("/api/auth/access", null, {
          withCredentials: true,
        });
        dispatch({ type: "GET_TOKEN", payload: res.data.ac_token });
       } catch (error) {
        dispatch({ type: "SIGNOUT" })
        localStorage.removeItem("firstLogin")
       }
        setTimeout(getToken, 2 * 10 * 1000); //2 minutes
      };
      getToken();
    }
  }, [dispatch, isLoggedIn]);

  // get user data
  useEffect(() => {
    if (token && !user) {
      const getUser = async () => {
        dispatch({ type: "SIGNING" });
        const res = await apiConfig.baseAPI.get("/api/auth/user", {
          headers: { Authorization: token },
        });
        dispatch({ type: "GET_USER", payload: res.data });
      };
      getUser();
    }
  }, [dispatch, token]);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient">Humans thoughts</span>
      </h1>
      <p className="desc text-center">Share your thoughts for the world</p>
      <Feed />
    </section>
  );
};

export default HomePage;

"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import apiConfig from "../utils/apiConfig";

import { AuthContext } from "@/context/AuthContext";

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
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
          dispatch({ type: "SIGNOUT" });
          localStorage.removeItem("firstLogin");
        }
        setTimeout(getToken, 2 * 10 * 1000); //2 minutes
      };
      getToken();
    }
  }, [dispatch, isLoggedIn]);

  // get user data
  useEffect(() => {
    if (token && user === null) {
      const getUser = async () => {
        const res = await apiConfig.baseAPI.get("/api/auth/user", {
          headers: { Authorization: token },
        });
        dispatch({ type: "GET_USER", payload: res.data });
      };
      getUser();
    }
  }, [dispatch, token, user]);

  const signOut = async () => {
    await apiConfig.baseAPI.get("/api/auth/signout", { withCredentials: true });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "SIGNOUT" });
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3 z-10 z-50">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">SBP</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {isLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/blog/create-post" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/auth/profile">
              <Image
                src={user?.avatar}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            <Link href="/auth/signin" className="black_btn">
              Sign In
            </Link>
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isLoggedIn ? (
          <div className="flex">
            <Image
              src={user?.avatar}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/auth/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/auth/signin" className="black_btn">
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

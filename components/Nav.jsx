"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import apiConfig from '../utils/apiConfig';
import { GlobalState } from "../utils/GlobalState";

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [user] = state.userAPI.userDetails;     

  const signOut = async () => {
    await apiConfig.baseAPI.get("/api/auth/signout");
    localStorage.removeItem("firstLogin");
    window.location.href = "/";
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
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
        {isLogged ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={user?.image}
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
        {isLogged ? (
          <div className="flex">
            <Image
              src={user?.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
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

"use client";

import { useState, useEffect, useContext } from "react";

import BlogCard from "./BlogCard";
import apiConfig from "@/utils/apiConfig";
import { AuthContext } from "@/context/AuthContext";
import Loading from "./Loading";

const BlogCardList = ({ data, token, setCallback,router }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <BlogCard
          key={post._id}
          post={post}
          token={token}
          setCallback={setCallback}
          router={router}
        />
      ))}
    </div>
  );
};

const Feed = ({router}) => {
  const { token } = useContext(AuthContext);
  const [allPosts, setAllPosts] = useState([]);
  const [callback, setCallback] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Search states
  const [searchText, setSearchText] = useState("");

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const res = await apiConfig.baseAPI.get(
        `/api/post/?search=${searchText}`
      );
      setAllPosts(res.data);
      setCallback(false);
      setIsLoading(false);
    } catch (error) {
      console.log("fetchPosts ~ error:", error);
      setCallback(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    callback && fetchPosts();
  }, [callback]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCallback(true);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a title or a author name"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {isLoading ? (
        <div className="h-screen">
          <Loading />
        </div>
      ) : (
        <BlogCardList data={allPosts} token={token} setCallback={setCallback} router={router} />
      )}
    </section>
  );
};

export default Feed;

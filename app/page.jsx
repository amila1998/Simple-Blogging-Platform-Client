"use client";

import Feed from "@/components/Feed";

const HomePage = () => {
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

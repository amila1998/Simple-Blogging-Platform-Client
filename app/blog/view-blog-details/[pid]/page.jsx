"use client";

import apiConfig from "@/utils/apiConfig";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AuthContext } from "@/context/AuthContext";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

dayjs.extend(relativeTime);

const ViewBlogPage = ({ params }) => {
  const router = useRouter();
  const BlogPostId = params.pid;
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const { user,token } = useContext(AuthContext);

  useEffect(() => {
    const getBlogPostById = async () => {
      try {
        setIsLoading(true)
        const res = await apiConfig.baseAPI.get(`/api/post/${BlogPostId}`);
        setPost(res.data);
        setIsLoading(false)
      } catch (error) {
        console.log("🚀 ~ file: page.jsx:12 ~ useEffect ~ error:", error);
        setIsLoading(false)
        router.back();
      }
    };
    getBlogPostById();
  }, []);

  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 200) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleEdit = (pid) => {
    router.push(`/blog/edit-post/${pid}`)
  };
  const handleDelete = async(pid) => {
    console.log("🚀 ~ file: page.jsx:63 ~ handleDelete ~ pid:", pid)
    try {
      const res = await apiConfig.baseAPI.delete(`/api/post/delete/${pid}`, {
        headers: { Authorization: token },
      });
      router.back();
    } catch (error) {
      console.log("🚀 ~ file: BlogCard.jsx:20 ~ handleDelete ~ error:", error);
    }
  };

  return (
    <section className="w-full flex justify-center">
      {isLoading ? <>
      <div className="h-screen">
      <Loading/>
      </div>
      </>:<>
      <div className="w-full">
        <div className="flex items-start gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="font-satoshi justify-center font-semibold text-gray-900 lg:text-4xl">
              {post?.title}
            </h1>
            <div className="flex items-center gap-3">
              <Image
                src={post?.author?.avatar}
                alt="user_image"
                width={20}
                height={20}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h5 className="font-inter text-sm text-gray-500">
                  {post?.author?.name}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="flex justify-start">
            <h5 className="font-inter text-sm text-gray-500">
              {dayjs(post.createdAt).fromNow()}
            </h5>
          </div>
          {user?._id === post.author?.id && (
            <div className="flex justify-end ">
              <div
                className="font-inter text-sm green_gradient cursor-pointer ml-2 mr-2"
                onClick={()=>handleEdit(post._id)}
              >
                Edit
              </div>
              <div
                className="font-inter text-sm orange_gradient cursor-pointer ml-2 mr-2"
                onClick={()=>handleDelete(post._id)}
              >
                Delete
              </div>
            </div>
          )}
        </div>
        <div className="my-4 px-5 py-5">
          <ReactQuill value={post?.content} readOnly={true} theme="bubble" />
        </div>
      </div>
      {showScrollButton && (
        <button
          className="fixed bottom-5 right-5 bg-gray-900 text-white p-3 rounded-full shadow-lg"
          onClick={scrollToTop}
        >
          Scroll to Top
        </button>
      )}
      </>}
    </section>
  );
};

export default ViewBlogPage;

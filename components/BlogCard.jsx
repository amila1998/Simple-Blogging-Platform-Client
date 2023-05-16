"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import apiConfig from "@/utils/apiConfig";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const BlogCard = ({ post, token, setCallback }) => {
  const router = useRouter();

  const { user } = useContext(AuthContext);

  const handleProfileClick = () => {};

  const handleDelete = async (pid) => {
    try {
      const res = await apiConfig.baseAPI.delete(`/api/post/delete/${pid}`, {
        headers: { Authorization: token },
      });
      setCallback(true);
    } catch (error) {
      console.log("🚀 ~ file: BlogCard.jsx:20 ~ handleDelete ~ error:", error);
    }
  };
  const handleEdit = (pid) => {
    router.push(`/blog/edit-post/${pid}`)
  };

  const pushToView = (pid) => {
    router.push(`/blog/view-blog-details/${pid}`);
  };

  return (
    <div className="prompt_card cursor-pointer hover:shadow-lg hover:scale-105 transition duration-300 h-30 overflow-hidden">
      <div onClick={(e) => pushToView(post._id)}>
        <div className="flex justify-between items-start gap-5">
          <div className="flex flex-col gap-3">
            <h2 className="font-satoshi font-semibold text-gray-900">
              {post.title}
            </h2>
            <div
              className="flex-1 flex justify-start items-center gap-3 "
              onClick={handleProfileClick}
            >
              <Image
                src={post.author.avatar}
                alt="user_image"
                width={20}
                height={20}
                className="rounded-full object-contain"
              />

              <div className="flex flex-col">
                <h5 className="font-inter text-sm text-gray-500">
                  {post.author.name}
                </h5>
              </div>
            </div>
            <div className="flex flex-col">
              <h5 className="font-inter text-sm text-gray-500">
                {dayjs(post.createdAt).fromNow()}
              </h5>
            </div>
          </div>
        </div>
        <div className="my-4 h-20 overflow-hidden">
          <ReactQuill value={post.content} readOnly={true} theme="bubble" />
        </div>
      </div>
      {user?._id === post.author.id && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={(e) => handleEdit(post._id)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={(e) => handleDelete(post._id)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogCard;

"use client";
import Form from "@/components/Form";
import { AuthContext } from "@/context/AuthContext";
import apiConfig from "@/utils/apiConfig";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPostPage = ({ params }) => {
  const BlogPostId = params.pid;
  const router = useRouter();
  const { isLoggedIn, token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiConfig.baseAPI.patch(
        `/api/post/update/${BlogPostId}`,
        { title, content, isPublish: true },
        {
          headers: { Authorization: token },
        }
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
      router.push(`/blog/edit-post/${BlogPostId}`);
    } catch (err) {
      console.log("🚀 ~ file: page.jsx:20 ~ handleSubmit ~ error:", err);
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
    router.back();
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [router, isLoggedIn]);

  useEffect(() => {
    const getBlogPostById = async () => {
      try {
        const res = await apiConfig.baseAPI.get(`/api/post/${BlogPostId}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        console.log("🚀 ~ file: page.jsx:12 ~ useEffect ~ error:", error);
        router.back();
      }
    };
    getBlogPostById();
  }, []);

  return (
    <>
      <ToastContainer />
       <Form
        handleSubmit={handleSubmit}
        setTitle={setTitle}
        setContent={setContent}
        title={title}
        content={content}
        token={token}
        isEdit={true}
        router={router}
      />
    </>
  );
};

export default EditPostPage;

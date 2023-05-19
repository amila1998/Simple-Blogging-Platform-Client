"use client"
import apiConfig from "@/utils/apiConfig";

import { useMemo, useRef } from "react";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";

// import { useRouter } from "next/navigation";


export default function Form({
  content,
  setContent,
  handleSubmit,
  setTitle,
  title,
  token,
  isEdit,
  router,
}) {
  const quillRef = useRef();
  // const router = useRouter();
  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor();
    console.log(editor);
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        const res = await apiConfig.baseAPI.post("/api/upload", formData, {
          headers: { Authorization: token },
        });
        const url = res?.data?.url;
        editor.insertEmbed(editor.getSelection(), "image", url);
      } else {
        // ErrorToast('You could only upload images.');
      }
    };
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "italic", "underline"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );
  return (
    <section className="mx-auto my-8 px-4">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {isEdit ? "Update Post" : "Create Post"}
        </span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label htmlFor="title" className="font-medium text-gray-700 block mb-1">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Title
          </span>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            className="form_input"
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Body
          </span>
          <div className="bg-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 w-full rounded-md py-2 px-3">
          {typeof window !== "undefined" && <ReactQuill
              theme="snow"
              ref={quillRef}
              value={content}
              modules={modules}
              onChange={handleContentChange}
            />}
          </div>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <div onClick={() => router.back()} className="text-gray-500 cursor-pointer text-sm">
            Cancel
          </div>

          <button
            type="submit"
            disabled={false}
            className="px-5 py-1.5 text-sm bg-primary-orange cursor-pointer rounded-full text-white"
          >
            {isEdit ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}

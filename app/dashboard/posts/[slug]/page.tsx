"use client";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Input from "@/app/components/customInput";
import { decodedTokenType } from "@/app/types/auth.types";
import { CreatePostType, ImageType, PostType } from "@/app/types/post.types";
import axios from "axios";
import jwt from "jsonwebtoken";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PacmanLoader } from "react-spinners";

export default function AuthorCreatePost({
  params,
  post_id,
}: {
  params: { slug: "create" | "edit" };
  post_id?: number;
}) {
  const [keyword, setKeyword] = useState<string>("");
  const [accessToken, setAccessToken] = useState("");
  const [files, setFiles] = useState<FileList | null>();
  const [toEditImage, setToEditImage] = useState<ImageType>();

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [postData, setPostData] = useState<CreatePostType>({
    author_id: 0,
    text: "",
    title: "",
    keywords: [],
    as_draft: false,
  });

  useEffect(() => {
    // protected route
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) router.back(); //Todo: show an actual error
    setAccessToken(accessToken as string);
    const decodedToken: decodedTokenType = JSON.parse(
      JSON.stringify(jwt.decode(accessToken as string))
    );

    if (decodedToken.role !== "author") router.back(); //Todo: show an actual error
    if (decodedToken.role === "author") {
      setPostData((prev) => {
        return { ...prev, author_id: decodedToken.id };
      });
    }
  }, [router]);

  useEffect(() => {
    (async () => {
      try {
        if (post_id) {
          setLoading(true);
          const { data } = await axios.get("/api/post?post_id=" + post_id);
          const post: PostType = data.post;

          setPostData((prev) => {
            return {
              ...prev,
              post_id: post_id as number,
              text: post?.md_content?.text as string,
              title: post?.title,
              keywords: post?.keywords.map((keyword) => keyword.Keyword?.word),
            };
          });
          setKeyword(
            post?.keywords.map((keyword) => keyword.Keyword?.word).join(", ")
          );
          setToEditImage(post?.image);
          setLoading(false);
        }
      } catch (error: any) {
        setLoading(false);
        return Swal.fire({
          title: "Error!",
          text: error?.message || "Oops, something went wrong😞😞",
          icon: "error",
          confirmButtonText: "Cool",
        });
      }
    })();
  }, [postData?.author_id, post_id]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const toBase64 = (file: File) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };

    let uploadImage;
    if (files?.length) uploadImage = await toBase64(files[0]);
    if (!toEditImage?.url)
      if (!files?.length) {
        return Swal.fire({
          title: "Error!",
          text: "Please add an Image",
          icon: "error",
          confirmButtonText: "Cool",
        });
      }

    postData.keywords = keyword.split(",").map((word: string) => word.trim());
    if (postData.keywords.length < 2)
      return Swal.fire({
        title: "Error!",
        text: "Need at least two Keywords",
        icon: "error",
        confirmButtonText: "Cool",
      });

    if (!postData.title)
      return Swal.fire({
        title: "Error!",
        text: "Article needs a Title",
        icon: "error",
        confirmButtonText: "Cool",
      });

    if (!postData.text)
      return Swal.fire({
        title: "Error!",
        text: "What? No Content? Gee Greatest Post ever😒😒",
        icon: "error",
        confirmButtonText: "Cool",
      });

    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${accessToken}` };
      const uploadData = postData;

      if (params?.slug === "edit")
        await axios.put(
          "/api/post",
          { ...postData, image: uploadImage as string },
          { headers }
        );
      if (params?.slug === "create")
        await axios.post(
          "/api/post",
          { ...postData, image: uploadImage as string },
          { headers }
        );

      setLoading(false);
      Swal.fire({
        title: "Success!!!",
        text: "Successfully Created the Article",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          router.back();
        }
      });
    } catch (error: any) {
      setLoading(false);
      return Swal.fire({
        title: "Error!",
        text: error?.message || "Oops, something went wrong😞😞",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  const handleChange = (event: any) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex relative flex-col md:gap-4 gap-2">
      <button
        onClick={() => router.back()}
        className="absolute hover:scale-125 top-6 left-4"
      >
        <MdOutlineArrowBackIosNew />
      </button>
      <h1 className="mx-auto flex md:text-[1.2rem] my-6 font-semibold">
        {params.slug === "create" ? "Create New Article" : "Edit Article"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 md:mx-4 mx-2 md:mb-16 mb-8"
      >
        <div className="flex flex-col gap-2 mx-auto">
          <label htmlFor="image">
            <div className="rounded-full flex justify-around bg-ash/40 md:w-56 w-40 md:h-56 h-40 md:text-[0.875rem] text-[0.75rem] font-semibold">
              {files?.length || toEditImage?.url ? (
                <Image
                  src={
                    files?.length
                      ? URL.createObjectURL(files[0])
                      : (toEditImage?.url as string)
                  }
                  alt="choosen cover"
                  className="w-full h-full rounded-full object-cover"
                  width={4024}
                  height={4024}
                />
              ) : (
                <span className="my-auto">Add Cover Image</span>
              )}
            </div>
          </label>
          <input
            name="image"
            type="file"
            id="image"
            className=" bg-transparent hidden"
            placeholder="image"
            onChange={(event) => {
              setFiles(event.target?.files);
            }}
          />
        </div>
        <Input
          id="title_of_article:"
          placeholder="The Innovation Behind the New World "
          classNameLabel="font-semibold"
          onChange={(event: any) => {
            setPostData({ ...postData, title: event.target.value });
          }}
          value={postData.title}
        />
        <div className="flex flex-col">
          <label className="capitalize md:text-[0.875rem] text-[0.75rem]  text-black font-semibold">
            Body of Article:
          </label>
          <textarea
            name="text"
            className="outline-none border-2 border-black bg-transparent md:text-base text-[0.875rem] px-4 py-2 md:h-[30rem] h-[20rem]"
            placeholder="Article text"
            onChange={handleChange}
            value={postData.text}
          />
        </div>
        <Input
          id="keywords:"
          placeholder="Devfest, Design, Copyright, Innovation, Full-stack, Development, Hackathon, Teamwork"
          classNameLabel="font-semibold"
          onChange={(event: any) => setKeyword(event?.target.value)}
          value={keyword}
        />

        <div className="flex gap-2 justify-end w-full my-4">
          <button
            type="button"
            className="bg-ash/70 flex text-white md:text-[0.875rem] text-[0.75rem] md:w-32 w-28 rounded px-4 p-2"
            onClick={(event) => {
              postData.as_draft = !postData.as_draft;
              handleSubmit(event);
            }}
          >
            Save as Draft
          </button>
          <button className="bg-blue text-white md:text-[0.875rem] text-[0.75rem] md:w-32 w-28 rounded p-2">
            Publish
          </button>
        </div>
      </form>
      {loading ? (
        <div className="absolute flex w-full h-full top-0 left-0 bg-white/30 justify-around">
          <PacmanLoader color="#000AFF" className="my-auto" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

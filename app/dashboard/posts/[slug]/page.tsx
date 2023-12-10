"use client";
import { decodedTokenType } from "@/app/types/auth.types";
import { CreatePostType } from "@/app/types/post.types";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthorCreatePost({
  params,
}: {
  params: { slug: "create" | "edit" };
}) {
  const [keyword, setKeyword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const router = useRouter();

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

  const [postData, setPostData] = useState<CreatePostType>({
    author_id: 0,
    text: "",
    title: "",
    keywords: [],
    as_draft: false,
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      console.log(postData);
      const headers = { Authorization: `Bearer ${accessToken}` };
      const { data } = await axios.post("/api/post", postData, { headers });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: any) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>{params.slug} posts page</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 m-4 w-1/4">
        <input
          name="title"
          placeholder="title"
          className=" bg-transparent"
          onChange={handleChange}
          value={postData.title}
        />
        <div>
          {postData.keywords.map((word: string, index: number) => {
            return (
              <span
                className="border p-2 m-2 bg-transparent text-white flex gap-2 "
                key={index}
              >
                <span>{word}</span>
                <span
                  className="cusor-pointer"
                  onClick={() => {
                    setPostData({
                      ...postData,
                      keywords: postData.keywords.filter(
                        (wordToRemove) => word !== wordToRemove
                      ),
                    });
                  }}
                >
                  X
                </span>
              </span>
            );
          })}
          <input
            name="keywords"
            placeholder="keywords"
            className=" bg-transparent"
            onChange={(event) => setKeyword(event?.target.value)}
            value={keyword}
          />
          <button
            type="button"
            onClick={() => {
              setPostData({
                ...postData,
                keywords: [...postData.keywords, keyword],
              });
              setKeyword("");
            }}
          >
            Add
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="image">Article Picture</label>
          <input
            name="image"
            type="file"
            id="image"
            className=" bg-transparent"
            placeholder="image"
          />
        </div>

        <div className="flex gap-2">
          <input
            name="role"
            id="role"
            type="checkbox"
            className=" bg-transparent"
            placeholder="role"
            onChange={() =>
              setPostData({
                ...postData,
                as_draft: !postData.as_draft,
              })
            }
          />
          <label htmlFor="role">Save as Draft</label>
        </div>

        <textarea
          name="text"
          className=" bg-transparent"
          placeholder="Article text"
          onChange={handleChange}
          value={postData.text}
        />
        <div className="flex flex-col gap-2 w-1/4">
          <button>{params.slug} posts</button>
        </div>
      </form>
    </div>
  );
}

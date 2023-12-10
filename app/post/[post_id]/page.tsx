"use client";
import { PostType } from "@/app/types/post.types";
import axios from "axios";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect, useState } from "react";
import "@/app/styles/md.module.scss";

export default function PostPage({ params }: { params: { post_id: number } }) {
  const [post, setPost] = useState<PostType>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/post?post_id=${params.post_id}`);
        setPost(data.post);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [params.post_id]);

  return (
    <div className="flex flex-col">
      <h1>{post?.title}</h1>
      {post?.md_content?.text ? (
        <div
          className="mdToHtml"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              marked.parse(post?.md_content?.text as string) as string
            ),
          }}
        ></div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

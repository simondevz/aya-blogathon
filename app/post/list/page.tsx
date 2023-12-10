"use client";
import { PostType } from "@/app/types/post.types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ListPostPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/post/list");
        setPosts(data.posts);
        console.log(data.posts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col">
      <h1>This is where List of Posts will be</h1>
      <span>Here are links to:-</span>
      <div className="flex flex-col gap-2">
        {posts?.map((post: PostType) => {
          return (
            <Link
              className="p-2 border"
              href={`/post/${post.id}`}
              key={post.id}
            >
              {post.title} by {post.author.username}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

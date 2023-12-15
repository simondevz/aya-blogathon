"use client";
import { PostType } from "@/app/types/post.types";
import axios from "axios";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect, useState } from "react";
import "@/app/styles/md.module.scss";
import Footer from "@/app/components/footer";
import Image from "next/image";
import logo from "../../components/decentralizedIQ.png";

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
      {post?.md_content?.text ? (
        <div className="lg:p-16 md:p-8 sm:p-6 p-4 flex flex-col gap-4 ">
          <Image
            src={post?.image?.url || logo}
            alt={"article"}
            width={4024}
            height={4024}
            className="w-full lg:h-[32rem] md:h-[28rem] rounded-2xl"
          />
          <div
            className="mdToHtml prose lg:prose-xl"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                marked.parse(post?.md_content?.text as string) as string
              ),
            }}
          ></div>
        </div>
      ) : (
        <div>loading...</div>
      )}
      <Footer />
    </div>
  );
}

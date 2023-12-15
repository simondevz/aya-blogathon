"use client";

import Image from "next/image";
import { MineaturPostType } from "../types/post.types";
import logo from "./decentralizedIQ.png";
import Link from "next/link";
import { RiEdit2Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { PacmanLoader } from "react-spinners";
import { useState } from "react";

export default function BlogPost({
  post,
  editAccess,
}: {
  post?: MineaturPostType;
  editAccess?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Link
      href={post?.id ? "/post/" + post?.id : "#"}
      onClick={() => setLoading(true)}
      className="flex relative flex-col gap-2 lg:min-w-[20rem] min-w-[15rem] w-fill shadow-lg rounded-lg"
    >
      {editAccess ? (
        <span className="absolute bottom-7 right-4 z-50 flex gap-3">
          <button
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                router.replace("/dashboard/posts/edit/" + post?.id);
              }, 1000);
            }}
            className="hover:scale-150"
          >
            <RiEdit2Fill />
          </button>
          <button
            onClick={async () => {
              try {
                const accessToken = window.localStorage.getItem("accessToken");
                const headers = { Authorization: `Bearer ${accessToken}` };
                const { data } = await axios.delete(
                  `/api/post?author_id=${post?.authorId}&post_id=${post?.id}`,
                  { headers }
                );
                console?.log(data);
                router.back();
              } catch (error) {
                console.log(error);
              }
            }}
            className="hover:scale-150 text-red-500"
          >
            <MdDelete />
          </button>
        </span>
      ) : (
        <></>
      )}
      <Image
        src={post?.image?.url || logo}
        alt={"post"}
        className="border rounded-lg object-fit w-full lg:h-[12rem] h-[8rem]"
        width={4024}
        height={4024}
        priority
      />
      <span className="absolute flex bg-transparent hover:bg-black/30 w-full rounded-lg lg:h-[12rem] h-[8rem] gap-2 top-[0rem] left-[0rem] lg:p-4 p-2">
        <span className="flex bg-white lg:h-6 h-4 rounded-2xl content-center lg:py-[0.2rem] px-2 lg:text-[0.75rem] text-[0.675rem] font-semibold">
          <span className="my-auto whitespace-nowrap truncate max-w-[5.5rem]">
            {post?.keywords[0]?.Keyword?.word || "Blockchain"}
          </span>
        </span>
        <span className="flex bg-white lg:h-6 h-4 content-center rounded-2xl lg:py-[0.2rem] px-2 lg:text-[0.75rem] text-[0.675rem] font-semibold">
          <span className="my-auto whitespace-nowrap truncate max-w-[5.5rem]">
            {post?.keywords[1]?.Keyword?.word || "Web 3"}
          </span>
        </span>
      </span>
      <div className="flex flex-col gap-2 lg:px-4 px-2 lg:pb-6 pb-3">
        <span className="font-bold lg:text-[0.875rem] text-[0.75rem] my-2">
          {post?.title ||
            "How to Better Understand the Rubrics of how the world of Web 3 works"}
        </span>
        <span className="flex lg:gap-4 gap-2 lg:text-[0.75rem] text-[0.675rem] text-ash/70 font-semibold ">
          <span>Dec 3, 2023</span>
          <span>10m</span>
        </span>
        <span className="flex gap-2 w-fit lg:text-[0.75rem] text-[0.675rem] px-2 py-[0.3rem] rounded-md bg-green/30 ">
          <span className="flex rounded-full bg-green w-2 h-2 my-auto"></span>
          <span className="my-auto flex">Beginner</span>
        </span>
      </div>
      {loading ? (
        <div className="absolute flex w-full h-full top-0 left-0 bg-white/30 justify-around">
          <PacmanLoader color="#000AFF" className="my-auto" />
        </div>
      ) : (
        <></>
      )}
    </Link>
  );
}

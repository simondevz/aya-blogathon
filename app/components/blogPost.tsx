import Image from "next/image";
import { MineaturPostType } from "../types/post.types";
import logo from "./decentralizedIQ.png";

export default function BlogPost() {
  // { post }: { post: MineaturPostType }
  return (
    <div className="flex relative flex-col gap-2 min-w-[20rem] w-fill shadow-lg rounded-lg">
      <Image
        src={logo}
        alt={"post"}
        className="border rounded-lg object-fit w-full h-[12rem]"
      />
      <span className="absolute flex bg-transparent hover:bg-black/30 w-full rounded-lg h-[12rem] gap-2 top-[0rem] left-[0rem] p-4">
        <span className="bg-white h-6 rounded-2xl py-[0.3rem] px-2 text-[0.75rem] font-semibold">
          Blockchain
        </span>
        <span className="bg-white h-6 rounded-2xl py-[0.2rem] px-2 text-[0.75rem] font-semibold">
          Web 3
        </span>
      </span>
      <div className="flex flex-col gap-2 px-4 pb-6">
        <span className="font-bold text-[0.875rem] my-2">
          How to Better Understand the Rubrics of how the world of Web 3 works
        </span>
        <span className="flex gap-4 text-[0.75rem] text-ash/70 font-semibold ">
          <span>Dec 3, 2023</span>
          <span>10m</span>
        </span>
        <span className="flex gap-2 w-fit text-[0.75rem] px-2 py-[0.3rem] rounded-md bg-green/30 ">
          <span className="flex rounded-full bg-green w-2 h-2 my-auto"></span>
          <span className="my-auto flex">Beginner</span>
        </span>
      </div>
    </div>
  );
}

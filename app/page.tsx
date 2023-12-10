import Image from "next/image";
import Link from "next/link";
import logo from "./components/decentralizedIQ.png";
import { M_PLUS_Rounded_1c } from "next/font/google";
import Footer from "./components/footer";
import BlogPost from "./components/blogPost";

const font = M_PLUS_Rounded_1c({ weight: ["700"], subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <div className="basis-1/2 flex flex-col my-auto p-4 ml-8">
          <span className="text-[1.2rem]">UNLOCK THE FUTURE OF</span>
          <h1
            className={
              "text-[4.5rem] font-bold leading-[4.5rem] " + font.className
            }
          >
            Web 3 & Blockchain
          </h1>
          <span className="pr-10">
            Your Comprehensive guide to Blockchain, NFTs, Smart Contracts and
            Cryptocurrencies. Curious Beginner or Seasoned Enthusiast, we’ll
            equip you with knowledge and skills to navigate the exiting world of
            Web 3.
          </span>
          <button className="place-self-start px-4 py-2 my-4 rounded bg-black text-white">
            Start here
          </button>
        </div>

        <div className="bg-milk flex flex-col gap-2 pr-10 rounded-bl-md ">
          <div className="flex flex-col gap-2 p-6">
            <span>FEATURED</span>
            <div className="flex flex-col">
              <Image
                src={logo}
                alt="featured post"
                className="w-[35rem] h-[19rem] rounded-md object-fit"
              />
              <span className="font-bold text-[1.2rem] my-2 pr-10">
                How to Better Understand the Rubrics of how the world of Web 3
                works
              </span>
            </div>
            <span className="flex gap-4 text-[0.875rem] text-ash/70 font-semibold">
              <span>Dec 3, 2023</span>
              <span>10m</span>
            </span>
            <span className="flex gap-2 w-fit text-[0.875rem] px-4 py-2 rounded-md bg-green/30 ">
              <span className="flex rounded-full bg-green w-2 h-2 my-auto"></span>
              <span className="my-auto flex">Beginner</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mx-12 mb-10">
        <h2 className="my-6 font-semibold">Latest Releases</h2>
        <div className="grid gap-12 auto-rows-auto grid-cols-3">
          {Array(6)
            .fill(1)
            .map((_, index: number) => {
              return <BlogPost key={index} />;
            })}
        </div>
      </div>

      <Footer />
    </div>
  );
}

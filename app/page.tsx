"use client";
import Image from "next/image";
import logo from "./components/decentralizedIQ.png";
import { M_PLUS_Rounded_1c } from "next/font/google";
import Footer from "./components/footer";
import BlogPost from "./components/blogPost";
import { useRouter } from "next/navigation";
import { ClipLoader, PacmanLoader } from "react-spinners";
import { useEffect, useState } from "react";
import axios from "axios";
import { MineaturPostType } from "./types/post.types";
import Swal from "sweetalert2";

const font = M_PLUS_Rounded_1c({ weight: ["700"], subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [startHereLoader, setStartHereLoader] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<MineaturPostType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/post/list");

        setPosts(data.posts);
        setLoading(false);
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
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between lg:gap-4 md:gap-2">
        <div className="md:basis-1/2 flex flex-col my-auto p-4 lg:ml-8 md:ml-6">
          <span className="lg:text-[1.2rem] sm:text-[1rem] text-[0.875rem]">
            UNLOCK THE FUTURE OF
          </span>
          <h1
            className={
              "lg:text-[4.5rem] sm:text-[4rem] text-[2rem] font-bold lg:leading-[4.5rem] sm:leading-[4rem] leading-[2rem] " +
              font.className
            }
          >
            Web 3 & Blockchain
          </h1>
          <span className="lg:pr-10 pr-6 sm:text-[0.875rem] text-[0.75rem]">
            Your Comprehensive guide to Blockchain, NFTs, Smart Contracts and
            Cryptocurrencies. Curious Beginner or Seasoned Enthusiast, we’ll
            equip you with knowledge and skills to navigate the exiting world of
            Web 3.
          </span>
          <button
            disabled={startHereLoader}
            onClick={() => router.push("/post/list")}
            className="place-self-start px-4 py-2 my-4 lg:text-base text-[0.875rem] rounded bg-black text-white"
          >
            {startHereLoader ? (
              <span className=" flex h-full">
                <ClipLoader size={20} color="#FFF" className="my-auto" />
              </span>
            ) : (
              "Start here"
            )}
          </button>
        </div>

        <div className="bg-milk flex flex-col gap-2 md:pr-3 lg:pr-10 rounded-bl-md hidden md:flex">
          <div className="flex flex-col gap-2 lg:p-6 p-3">
            <span className="lg:text-base text-[0.875rem]">FEATURED</span>
            <div className="flex flex-col">
              {posts?.length ? (
                <Image
                  src={posts[0]?.image?.url || logo}
                  alt="featured post"
                  width={4024}
                  height={4024}
                  className="lg:w-[35rem] lg:h-[19rem] w-[30rem] h-[13rem] rounded-md object-fit"
                />
              ) : (
                <span className="lg:w-[35rem] lg:h-[19rem] w-[30rem] h-[13rem] rounded-md flex bg-black"></span>
              )}
              <span className="font-bold lg:text-[1.2rem] md:text-[1rem] my-2 pr-10">
                {posts?.[0]?.title || "Welcome to DecentralizedIQ"}
              </span>
            </div>
            <span className="flex lg:gap-4 gap-2 lg:text-[0.875rem] text-[0.75rem] text-ash/70 font-semibold">
              <span>Dec 3, 2023</span>
              <span>10m</span>
            </span>
            <span className="flex gap-2 w-fit lg:text-[0.875rem] text-[0.75rem] px-4 py-2 rounded-md bg-green/30 ">
              <span className="flex rounded-full bg-green w-2 h-2 my-auto"></span>
              <span className="my-auto flex">Beginner</span>
            </span>
          </div>
        </div>
      </div>

      <div className="lg:mx-12 mx-6 lg:mb-10 md-8">
        <h2 className="my-6 font-semibold">Latest Releases</h2>
        {loading ? (
          <PacmanLoader color="#000AFF" className="mx-auto w-full" />
        ) : (
          <></>
        )}
        <div className="grid lg:gap-10 gap-4 auto-rows-auto md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {posts?.length ? (
            posts.map((post: MineaturPostType, index: number) => {
              return <BlogPost key={index} post={post} />;
            })
          ) : loading ? (
            <></>
          ) : (
            <div className="flex w-full mx-auto">
              We Have no articles yet...
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

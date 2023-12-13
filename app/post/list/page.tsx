"use client";
import BlogPost from "@/app/components/blogPost";
import Footer from "@/app/components/footer";
import { MineaturPostType } from "@/app/types/post.types";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { ClipLoader, PacmanLoader } from "react-spinners";
import Swal from "sweetalert2";

export default function ListPostPage({ editAccess }: { editAccess?: boolean }) {
  const [posts, setPosts] = useState<MineaturPostType[]>([]);
  const [postCount, setPostCount] = useState<number>(0);
  const searchParams = useSearchParams();

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCreateNew, setLoadingCreateNew] = useState<boolean>(false);
  const author_id = searchParams.get("user");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "/api/post/list" + (author_id ? "?author_id=" + author_id : "")
        );

        setPosts(data.posts);
        setPostCount(data.count);
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
  }, [author_id]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between py-4 w-full lg:px-12 px-6 bg-milk mb-4">
        <span className="flex gap-4 my-auto lg:text-base text-[0.875rem] ">
          <span className="my-auto">Layout</span>
          <span className="my-auto">
            <BsGrid3X3GapFill />
          </span>
        </span>
        {editAccess ? (
          <button
            disabled={loadingCreateNew}
            onClick={() => router.push("/dashboard/posts/create")}
            className="bg-blue text-white lg:text-[0.875rem] text-[0.75rem] font-semibold rounded-2xl py-2 px-5 my-auto"
          >
            {loadingCreateNew ? (
              <span className=" flex h-full">
                <ClipLoader size={20} color="#FFF" className="my-auto" />
              </span>
            ) : (
              "Create New Article"
            )}
          </button>
        ) : (
          <></>
        )}
      </div>
      <h1 className="lg:text-[1.5rem] text-[1.2rem] font-semibold my-4 lg:mx-12 mx-6">
        Articles({postCount})
      </h1>
      {loading ? (
        <PacmanLoader color="#000AFF" className="mx-auto w-full" />
      ) : (
        <></>
      )}
      <div className="grid lg:gap-12 gap-6 auto-rows-auto grid-cols-3 lg:mx-12 mx-6 lg:mb-10 mb-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {posts?.length ? (
          posts.map((post: MineaturPostType, index: number) => {
            return <BlogPost key={index} post={post} editAccess={editAccess} />;
          })
        ) : loading ? (
          <></>
        ) : author_id ? (
          <div className="flex w-full mx-auto">No articles yet...</div>
        ) : (
          <div className="flex w-full mx-auto">You Have no articles yet...</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

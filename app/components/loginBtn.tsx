"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decodedTokenType } from "../types/auth.types";
import jwt from "jsonwebtoken";
import { ClipLoader } from "react-spinners";

export default function LoginBtn() {
  const route = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [user, setUser] = useState<decodedTokenType>();

  useEffect(() => {
    // protected route
    const accessToken = window.localStorage.getItem("accessToken");
    const decodedToken: decodedTokenType = JSON.parse(
      JSON.stringify(jwt.decode(accessToken as string))
    );

    const timenow = new Date().getTime() / 1000;
    if (decodedToken?.exp > timenow) {
      setAccessToken(accessToken as string);
      setUser(() => {
        return decodedToken;
      });
    }
  }, [pathname]);

  return (
    <>
      {!accessToken ? (
        <button
          disabled={loading}
          className={
            (pathname === "/auth/login" || pathname === "/auth/signup"
              ? "hidden "
              : "flex ") +
            " justify-center bg-blue rounded-md lg:px-6 px-4 lg:h-[2.2rem] h-[1.8rem] lg:text-base text-[0.875rem] my-auto"
          }
          onClick={() => {
            setLoading(true);
            route.push("/auth/login");
            setLoading(false);
          }}
        >
          {loading ? (
            <span className=" flex h-full">
              <ClipLoader size={20} color="#FFF" className="my-auto" />
            </span>
          ) : (
            <span className="flex mx-auto text-white font-semibold my-auto">
              Login
            </span>
          )}
        </button>
      ) : user?.role === "author" ? (
        <>
          <button
            disabled={loading}
            className={
              (pathname.includes("dashboard") ? "hidden " : "flex ") +
              " justify-center bg-blue rounded-md lg:px-6 px-4 lg:h-[2.2rem] h-[1.8rem] lg:text-base text-[0.875rem] my-auto"
            }
            onClick={() => {
              setLoading(true);
              route.push("/dashboard?user=" + user?.id);
              setLoading(false);
            }}
          >
            {loading ? (
              <span className=" flex h-full">
                <ClipLoader size={20} color="#FFF" className="my-auto" />
              </span>
            ) : (
              <span className="flex mx-auto text-white font-semibold my-auto">
                Profile
              </span>
            )}
          </button>
          <button
            className={
              (pathname.includes("dashboard") ? "flex " : "hidden ") +
              " justify-center bg-blue rounded-md lg:px-6 px-4 lg:h-[2.2rem] h-[1.8rem] lg:text-base text-[0.875rem] my-auto"
            }
            onClick={() => {
              localStorage.removeItem("accessToken");
              route.push("/");
            }}
          >
            {loading ? (
              <span className=" flex h-full">
                <ClipLoader size={20} color="#FFF" className="my-auto" />
              </span>
            ) : (
              <span className="flex mx-auto text-white font-semibold my-auto">
                logout
              </span>
            )}
          </button>
        </>
      ) : (
        <button
          className={
            (pathname.includes("dashboard") ? "flex " : "hidden ") +
            " justify-center bg-blue rounded-md lg:px-6 px-4 lg:h-[2.2rem] h-[1.8rem] lg:text-base text-[0.875rem] my-auto"
          }
          onClick={() => {
            localStorage.removeItem("accessToken");
          }}
        >
          {loading ? (
            <span className=" flex h-full">
              <ClipLoader size={20} color="#FFF" className="my-auto" />
            </span>
          ) : (
            <span className="flex mx-auto text-white font-semibold my-auto">
              logout
            </span>
          )}
        </button>
      )}
    </>
  );
}

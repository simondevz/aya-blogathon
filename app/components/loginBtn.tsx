"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LoginBtn() {
  const route = useRouter();
  const pathname = usePathname();

  return (
    <button
      className={
        (pathname === "/auth/login" || pathname === "/auth/signup"
          ? "hidden "
          : "flex ") +
        " justify-center bg-blue rounded-md px-6 h-[2.2rem] my-auto"
      }
      onClick={() => route.push("/auth/login")}
    >
      <span className="flex mx-auto text-white font-semibold my-auto">
        Login
      </span>
    </button>
  );
}

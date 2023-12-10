"use client";
import Input from "@/app/components/customInput";
import { UserLogin } from "@/app/types/auth.types";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [logInWithUsername, setLogInWithUsername] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserLogin>({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      console.log(formData);
      const { data } = await axios.post("/api/auth/login", {
        password: formData.password,
        [logInWithUsername ? "username" : "email"]: logInWithUsername
          ? formData.username
          : formData.email,
      });
      localStorage.setItem("accessToken", data.Access_token);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 m-4 w-2/5 mx-auto"
      >
        <h1 className="text-[1.75rem] font-bold my-2">Login</h1>
        <Input
          id="username"
          classNameDiv={logInWithUsername ? "flex " : "hidden "}
          onChange={handleChange}
          value={formData.username as string}
        />
        <Input
          id="email"
          classNameDiv={logInWithUsername ? "hidden " : "flex "}
          onChange={handleChange}
          value={formData.email as string}
        />
        <Input
          id="password"
          classNameDiv="flex"
          onChange={handleChange}
          value={formData.password as string}
        />

        <div className="flex flex-col gap-4 w-full mt-[-0.25rem]">
          <button
            type="button"
            onClick={() => setLogInWithUsername(!logInWithUsername)}
            className="text-[0.875rem] text-blue font-semibold place-self-end"
          >
            Use {!logInWithUsername ? "Username" : "Email"} Instead...
          </button>
          <button className=" p-4 bg-blue font-semibold text-white rounded">
            Login
          </button>
          <span className="place-self-end font-semibold text-[0.875rem] mt-[-0.75rem]">
            <span>Don’t have an account?</span>{" "}
            <Link href={"/auth/signup"} className="text-blue">
              Sign up here
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

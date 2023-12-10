"use client";
import Input from "@/app/components/customInput";
import { UserSignup } from "@/app/types/auth.types";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [formData, setFormData] = useState<UserSignup>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
    as_writer: false,
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      console.log(formData);
      const { data } = await axios.post("/api/auth/signup", formData);
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
        className="flex flex-col gap-2 mx-auto w-2/5 my-10"
      >
        <h1 className="text-[1.75rem] font-bold my-2">
          Create Personal Account
        </h1>
        <Input
          id="username"
          classNameDiv="flex"
          onChange={handleChange}
          value={formData.username}
        />
        <Input
          id="first_name"
          classNameDiv="flex"
          onChange={handleChange}
          value={formData.first_name}
        />
        <Input
          id="last_name"
          classNameDiv="flex"
          onChange={handleChange}
          value={formData.last_name}
        />
        <Input
          id="email"
          classNameDiv="flex"
          onChange={handleChange}
          value={formData.email}
        />
        <Input
          id="password"
          classNameDiv="flex"
          onChange={handleChange}
          value={formData.password}
        />
        <Input
          id="confirm_password"
          classNameDiv="flex"
          onChange={handleChange}
          value={formData.confirm_password}
        />
        <div className="flex gap-2 w-full justify-end text-[0.875rem]">
          <input
            name="role"
            id="role"
            className="flex"
            type="checkbox"
            placeholder="role"
            onChange={() =>
              setFormData({
                ...formData,
                as_writer: !formData.as_writer,
              })
            }
          />
          <label htmlFor="role">Sign up as a Writer</label>
        </div>

        <div className="flex flex-col gap-4 w-full mt-[-0.25rem]">
          <span className="text-[0.875rem] mb-[-0.5rem] font-semibold place-self-end">
            By creating an account, I agree to Decentralized IQ’s{" "}
            <Link href={"#"} className="text-blue">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href={"#"} className="text-blue">
              Privacy Policy
            </Link>
          </span>
          <button className=" p-4 bg-blue font-semibold text-white rounded">
            Sign up
          </button>
          <span className="place-self-end text-[0.875rem] font-semibold mt-[-0.75rem]">
            <span>Already have an account?</span>{" "}
            <Link href={"/auth/login"} className="text-blue">
              Login here
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

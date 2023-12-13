"use client";
import Input from "@/app/components/customInput";
import { UserSignup } from "@/app/types/auth.types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";
import Swal from "sweetalert2";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();
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
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", formData);
      localStorage.setItem("accessToken", data.Access_token);

      setLoading(false);
      if (data.Access_token) {
        Swal.fire({
          title: "Successful!",
          text: "Signup successful",
          icon: "success",
          confirmButtonText: "Okay",
        }).then((result) => {
          if (result.isConfirmed) {
            setLoading(true);
            router.push("/post/list");
          }
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: data?.message,
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    } catch (error: any) {
      setLoading(false);
      return Swal.fire({
        title: "Error!",
        text: error?.message || "Oops, something went wrong😞😞",
        icon: "error",
        confirmButtonText: "Okay",
      });
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
        className="flex flex-col gap-2 mx-auto lg:w-2/5 sm:w-3/5 w-4/5 my-10"
      >
        <h1 className="md:text-[1.75rem] text-[1.2rem] font-bold my-2">
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
        <div className="flex gap-2 w-full justify-end md:text-[0.875rem] text-[0.75rem] ">
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
          <span className="md:text-[0.875rem] text-[0.75rem]  mb-[-0.5rem] font-semibold place-self-end">
            By creating an account, I agree to Decentralized IQ’s{" "}
            <Link href={"#"} className="text-blue">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href={"#"} className="text-blue">
              Privacy Policy
            </Link>
          </span>
          <button className=" md:p-4 p-2 bg-blue font-semibold text-white rounded">
            Sign up
          </button>
          <span className="place-self-end md:text-[0.875rem] text-[0.75rem]  font-semibold mt-[-0.75rem]">
            <span>Already have an account?</span>{" "}
            <Link href={"/auth/login"} className="text-blue">
              Login here
            </Link>
          </span>
        </div>
      </form>
      {loading ? (
        <div className="absolute flex w-full h-full top-0 left-0 bg-white/30 justify-around">
          <PacmanLoader color="#000AFF" className="my-auto" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

"use client";
import Input from "@/app/components/customInput";
import { UserLogin } from "@/app/types/auth.types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const [logInWithUsername, setLogInWithUsername] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserLogin>({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/login", {
        password: formData.password,
        [logInWithUsername ? "username" : "email"]: logInWithUsername
          ? formData.username
          : formData.email,
      });
      localStorage.setItem("accessToken", data.Access_token);
      console.log(data);
      setLoading(false);
      if (data.Access_token) {
        Swal.fire({
          title: "Successful!",
          text: "Login successful",
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
        className="flex flex-col gap-2 m-4 lg:w-2/5 sm:w-3/5 w-4/5 mx-auto"
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
            className="md:text-[0.875rem] text-[0.75rem]  text-blue font-semibold place-self-end"
          >
            Use {!logInWithUsername ? "Username" : "Email"} Instead...
          </button>
          <button className=" md:p-4 p-2 bg-blue font-semibold text-white rounded">
            Login
          </button>
          <span className="place-self-end font-semibold md:text-[0.875rem] text-[0.75rem]  mt-[-0.75rem]">
            <span>Don’t have an account?</span>{" "}
            <Link href={"/auth/signup"} className="text-blue">
              Sign up here
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

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAuthProvider } from "@/app/context";

export default function LoginPage() {
  const auth = useAuthProvider();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleClick = async () => {
    const response = await Test();
    console.log(response);
  }

  const onSubmit = (data: { email: string; password: string }) => {
    let redirect_url = "/";
    setIsLoggingIn(true);
    console.log(data);
    auth.signIn(data.email, data.password, redirect_url);
    setIsLoggingIn(false);
  };
  return (
    <div>
      <div className="m-auto mx-auto px-12 xl:container sm:px-0">
        <div className="mx-auto h-full">
          <div className="m-auto py-12">
            <button onClick={handleClick}>Test</button>

            <div className="mx-auto w-full max-w-md rounded-3xl border bg-white p-8 sm:p-10 dark:border-slate-700 dark:bg-black">
              <h3 className="text-center text-2xl font-semibold text-slate-700 dark:text-white">
                Login to your account
              </h3>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-12 space-y-6"
              >
                <div className="flex flex-col items-start">
                  <div className="relative w-full before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-0.5 before:origin-right before:scale-x-0 before:bg-sky-400 before:transition before:duration-300 focus-within:before:origin-left focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 dark:before:bg-sky-800">
                    <input
                      id="email"
                      type="email"
                      placeholder="Your email address"
                      className={`w-full border-b border-slate-300 bg-transparent pb-3 outline-none transition invalid:border-red-400 dark:border-slate-600 dark:placeholder-slate-300 ${
                        errors.email ? "border-red-400" : ""
                      }`}
                      {...register("email", { required: "Email is required" })}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                      {errors.email?.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start">
                  <div className="relative w-full before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-0.5 before:origin-right before:scale-x-0 before:bg-sky-400 before:transition before:duration-300 focus-within:before:origin-left focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 dark:before:bg-sky-800">
                    <input
                      id="password"
                      type="password"
                      placeholder="Your password"
                      className={`w-full border-b border-slate-300 bg-transparent pb-3 outline-none transition invalid:border-red-400 dark:border-slate-600 dark:placeholder-slate-300 ${
                        errors.password ? "border-red-400" : ""
                      }`}
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                      {errors.password?.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end">
                  <Link
                    href="/forgot-password"
                    type="button"
                    className="-mb-4 -mt-5 block w-max p-3"
                  >
                    <span className="text-sm tracking-wide text-sky-600 dark:text-sky-400">
                      Forgot password?
                    </span>
                  </Link>
                </div>

                <div className="text-center ">
                  <button
                    type="submit"
                    className="bg-primary dark:bg-primary hover:bg-primary/80 focus:bg-primary/80 flex h-11 w-full items-center justify-center rounded-full border px-6 py-3 transition hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                    disabled={isLoggingIn}
                  >
                    <span className="text-base font-semibold text-white">
                      {isLoggingIn ? "Logging in..." : "Login"}
                    </span>
                  </button>
                  <Link
                    href="/register"
                    className="mt-3 block text-sm tracking-wide text-sky-600 dark:text-sky-400"
                  >
                    Create new account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

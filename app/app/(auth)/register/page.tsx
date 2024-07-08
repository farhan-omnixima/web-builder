"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuthProvider } from "@/app/context";

const Register = () => {
  const auth = useAuthProvider();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const getTimezoneOffsetFormatted = (): string => {
    const offsetMinutes: number = new Date().getTimezoneOffset();
    const sign: string = offsetMinutes > 0 ? "-" : "+";
    const hours: string = (
      "0" + Math.floor(Math.abs(offsetMinutes) / 60)
    ).slice(-2);
    const minutes: string = ("0" + (Math.abs(offsetMinutes) % 60)).slice(-2);
    return sign + hours + ":" + minutes;
  };

  console.log("Register Page");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    console.log(data);
    let redirect_url = "/";
    const { name, username, email, password } = data;
    auth.signUp(email, password, name, username, redirect_url);
    setLoading(false);
  };

  return (
    <div className="bg-primary/10 dark:bg-slate-800">
      <div className="m-auto mx-auto px-12 xl:container sm:px-0">
        <div className="mx-auto h-full">
          <div className="m-auto py-12">
            <div className="mx-auto w-full max-w-md rounded-3xl border bg-white p-8 sm:p-10 dark:border-slate-700 dark:bg-black">
              <h3 className="text-center text-2xl font-semibold text-slate-700 dark:text-white">
                Create an Account
              </h3>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-12 space-y-6"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <div className="relative before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-0.5 before:origin-right before:scale-x-0 before:bg-sky-400 before:transition before:duration-300 focus-within:before:origin-left focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 dark:before:bg-sky-800">
                      <input
                        id="name"
                        type="text"
                        placeholder="First Name"
                        className={`w-full border-b border-slate-300 bg-transparent pb-3 outline-none transition invalid:border-red-400 dark:border-slate-600 dark:placeholder-slate-300 ${
                          errors.name ? "border-red-400" : ""
                        }`}
                        {...register("name", {
                          required: "First Name is required",
                        })}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                        {errors.name?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="relative before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-0.5 before:origin-right before:scale-x-0 before:bg-sky-400 before:transition before:duration-300 focus-within:before:origin-left focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 dark:before:bg-sky-800">
                      <input
                        id="username"
                        type="text"
                        placeholder="Last Name"
                        className={`w-full border-b border-slate-300 bg-transparent pb-3 outline-none transition invalid:border-red-400 dark:border-slate-600 dark:placeholder-slate-300 ${
                          errors.username ? "border-red-400" : ""
                        }`}
                        {...register("username", {
                          required: "Last Name is required",
                        })}
                      />
                    </div>
                    {errors.username && (
                      <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                        {errors.username?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="relative before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-0.5 before:origin-right before:scale-x-0 before:bg-sky-400 before:transition before:duration-300 focus-within:before:origin-left focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 dark:before:bg-sky-800">
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

                <div className="flex flex-col">
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
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                      {errors.password?.message}
                    </p>
                  )}
                </div>

                <div className="text-center">
                  <button
                    disabled={loading}
                    className="bg-primary dark:bg-primary hover:bg-primary/80 focus:bg-primary/80 flex h-11 w-full items-center justify-center rounded-full px-6 py-3 transition disabled:pointer-events-none disabled:opacity-50"
                  >
                    <span className="text-base font-semibold text-white">
                      {loading ? "Registering..." : "Register"}
                    </span>
                  </button>
                  <Link
                    href="/login"
                    className="mt-3 block text-sm tracking-wide text-sky-600 dark:text-sky-400"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

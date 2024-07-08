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
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg dark:bg-gray-800">
        <h3 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
          Create an Account
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="relative w-full">
              <input
                id="name"
                type="text"
                placeholder="Name"
                className={`w-full border rounded-lg px-4 py-3 bg-transparent outline-none transition dark:border-gray-700 dark:text-gray-300 focus:border-sky-500 dark:focus:border-sky-500 ${
                  errors.name ? "border-red-400" : ""
                }`}
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                  {errors.name?.message}
                </p>
              )}
            </div>

            <div className="relative w-full">
              <input
                id="username"
                type="text"
                placeholder="Username"
                className={`w-full border rounded-lg px-4 py-3 bg-transparent outline-none transition dark:border-gray-700 dark:text-gray-300 focus:border-sky-500 dark:focus:border-sky-500 ${
                  errors.username ? "border-red-400" : ""
                }`}
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                  {errors.username?.message}
                </p>
              )}
            </div>

            <div className="relative w-full">
              <input
                id="email"
                type="email"
                placeholder="Your email address"
                className={`w-full border rounded-lg px-4 py-3 bg-transparent outline-none transition dark:border-gray-700 dark:text-gray-300 focus:border-sky-500 dark:focus:border-sky-500 ${
                  errors.email ? "border-red-400" : ""
                }`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div className="relative w-full">
              <input
                id="password"
                type="password"
                placeholder="Your password"
                className={`w-full border rounded-lg px-4 py-3 bg-transparent outline-none transition dark:border-gray-700 dark:text-gray-300 focus:border-sky-500 dark:focus:border-sky-500 ${
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
              {errors.password && (
                <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                  {errors.password?.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-sky-600 rounded-full transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <Link
              href="/login"
              className="block mt-4 text-center text-sm text-sky-600 dark:text-sky-400 hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

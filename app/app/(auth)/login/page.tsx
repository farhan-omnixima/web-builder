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

  const onSubmit = (data: { email: string; password: string }) => {
    let redirect_url = "/";
    setIsLoggingIn(true);
    auth.signIn(data.email, data.password, redirect_url);
    setIsLoggingIn(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg dark:bg-gray-800">
        <h3 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
          Login to your account
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="flex flex-col space-y-4">
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
                })}
              />
              {errors.password && (
                <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-sky-600 dark:text-sky-400 hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-sky-600 rounded-full transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>
            <Link
              href="/register"
              className="block mt-4 text-center text-sm text-sky-600 dark:text-sky-400 hover:underline"
            >
              Create new account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

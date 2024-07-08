"use client";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuthProvider } from "@/app/context";
import { useEffect } from "react";

export default async function SettingsPage() {
  const { user, session } = useAuthProvider();
  if (!session) {
    redirect("/login");
  }

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

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Settings
        </h1>
        <div className="flex flex-col space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
              <h2 className="font-cal text-xl dark:text-white">Name</h2>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Your name on this app.
              </p>
              <div className="relative w-full">
                <input
                  id="name"
                  type="text"
                  placeholder="Brendon Urie"
                  className="w-full rounded-lg border bg-transparent px-4 py-3 outline-none transition focus:border-sky-500 dark:border-gray-700 dark:text-gray-300 dark:focus:border-sky-500"
                />
              </div>
            </div>
            <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
              <h2 className="font-cal text-xl dark:text-white">Email</h2>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Your email on this app.
              </p>
              <div className="relative w-full">
                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="w-full rounded-lg border bg-transparent px-4 py-3 outline-none transition focus:border-sky-500 dark:border-gray-700 dark:text-gray-300 dark:focus:border-sky-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-64 mt-12 flex items-center justify-center mx-auto rounded-lg bg-sky-500 py-3 font-medium text-white transition hover:bg-sky-600"
            >
              Save
            </button>
          </form>
        </div>

        {/* <Form
          title="Name"
          description="Your name on this app."
          helpText="Please use 32 characters maximum."
          inputAttrs={{
            name: "name",
            type: "text",
            defaultValue: user.name!,
            placeholder: "Brendon Urie",
            maxLength: 32,
          }}
          handleSubmit={editUser}
        />
        <Form
          title="Email"
          description="Your email on this app."
          helpText="Please enter a valid email."
          inputAttrs={{
            name: "email",
            type: "email",
            defaultValue: user.email!,
            placeholder: "panic@thedis.co",
          }}
          handleSubmit={editUser}
        /> */}
      </div>
    </div>
  );
}

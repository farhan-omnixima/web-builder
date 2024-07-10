"use client";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuthProvider } from "@/app/context";
import { useEffect, useState } from "react";
import { getUserById, updateUsers } from "@/app/actions/user";
import { SelectUser } from "@/lib/schema";

interface UpdateUser {
  name: string;
  email: string;
}

export default function SettingsPage() {
  const { user, session, updateUser } = useAuthProvider();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<SelectUser | null>(null);

  if (!session || !user) {
    redirect("/login");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
    },
  });

  useEffect(() => {
    const checkAuthentication = async () => {
      setLoading(true);
      if (user) {
        try {
          const res = await getUserById(user.id);
          if (res.success) {
            if (res.data) {
              setUserData(res.data);
              updateUser(res.data);
              reset({
                name: res.data.name || undefined,
                email: res.data.email,
              });
            } else {
              console.log(res.message);
              return;
            }
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        console.log("Authentication failed");
        redirect("/login");
      }
      setLoading(false);
    };
    checkAuthentication();
  }, []);

  const onSubmit = async (data: UpdateUser) => {
    setLoading(true);
    try {
      const res = await updateUsers(data);
      if (res.success) {
        updateUser(data);
        reset(data);
      } else {
        console.log(res.message);
      }
    } catch (e) {
      const error = e as Error;
      console.error(error);
    }
    setLoading(false);
  };

  const errorHandler = (errors: any) => {
    if (errors) {
      console.log(errors);
    }
  };

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-sky-500"></div>
        </div>
      ) : (
        <div className="flex flex-col space-y-6">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Settings
          </h1>
          <div className="flex flex-col space-y-4">
            <form onSubmit={handleSubmit(onSubmit, errorHandler)}>
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
                    {...register("name")}
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
                    disabled
                    {...register("email")}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mx-auto mt-12 flex w-64 items-center justify-center rounded-lg bg-sky-500 py-3 font-medium text-white transition hover:bg-sky-600"
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
      )}
    </div>
  );
}

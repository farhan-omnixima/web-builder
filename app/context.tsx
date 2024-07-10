"use client";
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  FC,
  useCallback,
  useContext,
} from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { DatabaseSession, User } from "lucia";
import { UpdateUser, updateUsers } from "./actions/user";

interface AuthContextProps {
  isAuthenticated: boolean;
  checkAuthentication: (isMounted: boolean) => void;
  user: User | null;
  updateUser: (updatedUser: UpdateUser) => Promise<UpdateUserResponse>;
  session: DatabaseSession | null;
  initAuth: boolean;
  signIn: (email: string, password: string, redirect_url?: string) => void;
  signUp: (
    email: string,
    password: string,
    name: string,
    username: string,
    redirect_url?: string,
  ) => Promise<SignUpResponse>;
  signOut: (redirect?: boolean) => void;
  //sendVerificationEmail: () => Promise<GenericResponse>;
  isSigningIn: boolean;
  isSigningOut: boolean;
}

interface SessionResponse {
  user: User;
  session: DatabaseSession;
}

interface GenericResponse {
  success: boolean;
  message: string;
}

interface SignInResponse extends GenericResponse {
  user?: User;
  session?: DatabaseSession;
}

interface SignUpResponse extends SignInResponse {}

interface SignOutResponse extends GenericResponse {}

interface UpdateUserResponse extends GenericResponse {}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  checkAuthentication: () => {},
  user: null,
  updateUser: async (): Promise<UpdateUserResponse> => {
    return Promise.resolve({
      success: false,
      message: "",
    });
  },
  session: null,
  initAuth: false,
  signIn: () => {},
  signUp: async (
    email: string,
    password: string,
    name: string,
    username: string,
    redirect_url?: string,
  ): Promise<SignUpResponse> => {
    return Promise.resolve({
      success: false,
      message: "",
    });
  },
  signOut: () => {},
  //   sendVerificationEmail: (): Promise<GenericResponse> => {
  //     return Promise.resolve({
  //       success: false,
  //       message: "",
  //     });
  //   },
  isSigningIn: false,
  isSigningOut: false,
});

export const useAuthProvider = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const queryParams = useSearchParams();
  const return_uri = queryParams?.get("return_uri");
  const action = queryParams?.get("action");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initAuth, setInitAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<DatabaseSession | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const updateUser = async (
    updatedUser: UpdateUser,
  ): Promise<UpdateUserResponse> => {
    setUser((prevUser) => {
      if (prevUser === null) return null;
      return {
        ...prevUser,
      };
    });
    try {
      const res = await updateUsers(updatedUser);
      if (res.success) {
        return {
          success: true,
          message: "User updated successfully",
        };
      } else {
        return {
          success: false,
          message: "",
        };
      }
    } catch (error) {
      console.error("Error updating user:", error);
      return {
        success: false,
        message: "",
      };
    }
  };

  const signIn = async (
    email: string,
    password: string,
    redirect_url?: string,
  ) => {
    setIsSigningIn(true);
    const signInToast = toast.loading("Signing in...");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("action", "signin");
    const signInResponse = await fetch("/api/auth/email", {
      method: "POST",
      body: formData,
      redirect: "manual",
    });
    const { success, message, user }: SignInResponse =
      await signInResponse.json();
    if (success && user) {
      setUser(user);
      setIsAuthenticated(true);
      toast.success("Signed in.", {
        id: signInToast,
      });
      if (redirect_url) {
        router.push(redirect_url);
      }
    } else {
      toast.error("Sign in failed: " + message, {
        id: signInToast,
      });
    }
    setIsSigningIn(false);
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    username: string,
    redirect_url?: string,
  ) => {
    setIsSigningIn(true);
    const signingUpToast = toast.loading("Signing up...");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("username", username);
    formData.append("action", "signup");
    const signUpResponse = await fetch("/api/auth/email", {
      method: "POST",
      body: formData,
      redirect: "manual",
    });
    const ReturnResponse: SignUpResponse = await signUpResponse.json();
    const { success, message, user } = ReturnResponse;
    if (success && user) {
      setUser(user);
      setIsAuthenticated(true);
      toast.success("Sign up successful!", {
        id: signingUpToast,
      });
      if (redirect_url) {
        router.push(redirect_url);
      }
    } else {
      toast.error(`Failed to sign up: ${message}`, {
        id: signingUpToast,
      });
    }
    setIsSigningIn(false);
    return ReturnResponse;
  };

  const signOut = async (redirect: boolean = true) => {
    setIsSigningOut(true);
    const signOutToast = toast.loading("Signing out...");
    const signOutResponse = await fetch("/api/auth/session/signout");
    const { success, message }: SignOutResponse = await signOutResponse.json();
    if (success) {
      setInitAuth(false);
      setIsAuthenticated(false);
      setUser(null);
      setSession(null);
      toast.success("Signed out.", {
        id: signOutToast,
      });
      if (redirect) {
        router.push("/");
        checkAuthentication(true);
      }
    } else {
      toast.error("Sign out failed: " + message, {
        id: signOutToast,
      });
    }
    setIsSigningOut(false);
  };

  const redirectToDashboard = useCallback(() => {
    toast.success("Welcome back!");
    // When the user is already signed in, user will be redirected to localhost:3000 to app.localhost:3000/
    router.push("/");
  }, [router]);

  const redirectToSignIn = useCallback(() => {
    toast.error("Please sign in to continue!");
    router.push("/login");
  }, [router]);

  const checkAuthentication = async (isMounted: boolean) => {
    try {
      const sessionResponse = await fetch("/api/auth/session");
      const { user, session }: SessionResponse = await sessionResponse.json();
      if (isMounted && user.id && session.id) {
        setIsAuthenticated(true);
        let loggeduser = user;
        if (!user.image) {
          loggeduser["image"] = "No Image";
        }
        setUser(user);
        setSession(session);
      }
    } catch (error) {
      if (isMounted) {
        setIsAuthenticated(false);
        setUser(null);
        setSession(null);
      }
    } finally {
      if (isMounted) {
        setInitAuth(true);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;

    checkAuthentication(isMounted);

    return () => {
      isMounted = false;
    };
  }, []);

  // useEffect(() => {
  //   if (initAuth) {
  //     const isOnDashboard = pathname.startsWith("/");
  //     const isOnAuthPage = pathname === "/login"; //auth
  //     const continueParamFailed = queryParams.get("continue") === "failed";

  //     if (user?.id) {
  //       if (isOnAuthPage && return_uri) {
  //         router.push(
  //           `/api/auth/consent?return_uri=${encodeURIComponent(return_uri)}`,
  //         );
  //       } else if (isOnAuthPage) {
  //         redirectToDashboard();
  //       }
  //     } else {
  //       if (continueParamFailed) {
  //         toast.error("Failed to continue with Google authentication.");
  //       }
  //       if (isOnDashboard) {
  //         redirectToSignIn();
  //       }
  //     }
  //   }
  // }, [
  //   initAuth,
  //   isAuthenticated,
  //   session,
  //   user,
  //   router,
  //   pathname,
  //   return_uri,
  //   action,
  //   queryParams,
  // ]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        checkAuthentication,
        user,
        updateUser,
        session,
        initAuth,
        signIn,
        signUp,
        signOut,
        //sendVerificationEmail,
        isSigningOut,
        isSigningIn,
      }}
    >
      {!initAuth ? (
        <>
          <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center gap-1 text-center">
            Loading...
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
};

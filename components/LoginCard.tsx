"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Login } from "@/types/types";
import { useAuth } from "@/app/api/auth/contexts/AuthContext";
import { getMe, logUser } from "@/actions/user-actions";

const formSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type LevelFormValues = z.infer<typeof formSchema>;

function LoginCard() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LevelFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: Login) => {
    localStorage.removeItem("passwordChanged");
    localStorage.removeItem("fullName");
    localStorage.removeItem("email");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("authorities");
    try {
      setLoading(true);
      const response = await logUser(data);
      if (response.access_token) {
        login(response.access_token, response.refresh_token);
        router.push(`/admin`);
        router.refresh();
        toast.success("Login success");
      }
    } catch (error: any) {
      console.error("Error is this:", error.message);

      if (error.message === "Please check your username and password.") {
        toast.error("Invalid username or password");
      } else if (
        error.message === "Network error: Unable to connect to the server."
      ) {
        toast.error("Network error: Unable to connect to the server");
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mt-8 xl:w-5/12">
      {/* <div>here{searchParams?.message && <h2>{searchParams.message}</h2>}</div> */}
      <div className="p-6 bg-white rounded shadow border border-gray-100 sm:p-10 dark:bg-gray-800">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="space-y-4 md:space-y-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username:</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="ring-1"
                          placeholder="johndoe@example.com"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password:</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="ring-1"
                          placeholder="••••••••"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href={"/auth/forgotpassword"}
                  className="text-sm font-medium text-cyan-500 hover:underline dark:text-cyan-500"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                disabled={loading}
                type="submit"
                className={"w-full text-white"}
              >
                SIGN IN
              </Button>
              {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don&apos;t have an account yet?
                <Link
                  href={"/auth/registration"}
                  className="font-medium ml-2 text-cyan-500 hover:underline dark:text-cyan-500"
                >
                  Sign up
                </Link>
              </p> */}
              <div className="form-group">
                <div
                  className={"hidden alert alert-success"}
                  role="alert"
                ></div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginCard;

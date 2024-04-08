"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import Jwt, { JwtPayload } from "jsonwebtoken";
import { useDispatch } from "react-redux";
import { setClient } from "@/lib/features/client/clientSlice";
import { Loader } from "./ui/loader";

import logo2 from "./../public/images/coop-logo.png";
import cmsLogo from "./../public/images/coop-logo.jpg";
import Image from "next/image";

const formSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type LevelFormValues = z.infer<typeof formSchema>;

function LoginCard() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  // const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm<LevelFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [message, setMessage] = useState("");

  const onSubmit = async (data: Login) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    localStorage.removeItem("clientId");
    try {
      setLoading(true);
      const response = await logUser(data);
      if (response.access_token) {
        const decodedData = Jwt.decode(response.access_token) as JwtPayload;
        const role = decodedData.role;
        login(response.access_token, response.refresh_token);
        if (role?.includes("SUPER-ADMIN")) {
          router.push(`/dashboard/dashboard`);
          dispatch(setClient(""));
        } else {
          router.push(`/users/dashboard`);
        }
        router.refresh();
        toast.success("Login success");
      }
    } catch (error: any) {
      console.error("Error is this:", error.message);

      if (error.message === "Please check your username and password.") {
        setMessage("Invalid username or password");
        toast.error("Invalid username or password");
      } else if (
        error.message === "Network error: Unable to connect to the server."
      ) {
        setMessage("Network error: Unable to connect to the server");
        toast.error("Network error: Unable to connect to the server");
      } else {
        setMessage("Something went wrong!");
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        {loading && (
          <div className="fixed right-1/2 top-1/2 z-[100]">
            <Loader />
          </div>
        )}

        <section className={`dark:bg-gray-900 ${loading && "opacity-50"}`}>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
            <div className="flex w-full items-center justify-center">
              <div className="w-full flex justify-center">
                <div className="w-full bg-gradient-to-r text-white bg-gray-400 to-cyan-400 from-blue-500 dark:from-gray-00 dark:to-gray-600 hidden md:block rounded-l-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center justify-center p-8">
                    <Image src={logo2} alt="logo" width={90} />
                    <div className="flex flex-col text-white font-bold ml-5 text-sm">
                      <span>Baankii Hojii Gamtaa Oromiyaa</span>
                      <span>የኦሮሚያ ኅብረት ሥራ ባንክ</span>
                    </div>
                  </div>
                  <div className="flex-1 items-center  justify-center text-xl font-bold px-16 py-3">
                    <span>COOP RECONCILIATION</span>
                  </div>
                  <div className="p-10">
                    <span className="text-4xl italic">&quot;</span>
                    <h3 className=" text-medium font-bold flex justify-center items-center">
                      Say goodbye to messy spreadsheets and endless paperwork
                      with our reconciliation app! Easily match and verify
                      financial transactions, saving time and reducing errors.
                    </h3>
                    <span className="float-right text-4xl italic">&quot;</span>
                  </div>
                </div>
                <div className="w-full bg-white rounded-r-lg shadow border dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center justify-center mt-4">
                    <Image src={cmsLogo} alt="logo" width={150} />
                  </div>
                  <div className="space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-cyan-900 md:text-2xl dark:text-white">
                      Sign in to your account
                    </h1>
                    {message && (
                      <span className="text-red-500 border rounded-lg bg-red-50 flex px-2 py-3">
                        {message}
                      </span>
                    )}
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 w-full"
                      >
                        <div className="space-y-4 md:space-y-4">
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
                                      placeholder="username"
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
                            className={"w-full bg-cyan-500 text-white"}
                          >
                            SIGN IN
                          </Button>
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
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default LoginCard;

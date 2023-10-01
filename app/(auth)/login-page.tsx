"use client";

import { logUser } from "@/actions/user-action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "./contexts/AuthContext";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";

interface Login {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

type LevelFormValues = z.infer<typeof formSchema>;

export function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const form = useForm<LevelFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: Login) => {
    console.log(data);
    try {
      setLoading(true);
      // await Addclient(data);
      // const response = await logUser(data);
      signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        // @ts-ignore
      }).then(({ error }) => {
        if (error) {
          setLoading(false);
          toast.error(error);
        } else {
          router.refresh();
          router.push("/dashboard");
        }
      });

      // console.log(response);
    } catch (error: any) {
      console.error("Error:", error);

      if (error.message === "Please check your email and password.") {
        toast.error("Invalid email or password");
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

    // revalidateTag("clients");
  };
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl w-80 text-cyan-500 font-semibold flex items-center justify-center">
          Sign In
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          {/* <Button variant="outline">
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button> */}
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              continue
            </span>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email:</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="johndoe@example.com"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        disabled={loading}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm text-cyan-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember Me
                </label>
              </div>
              <Button
                disabled={loading}
                type="submit"
                className="w-full my-3 mx-0 bg-cyan-500"
              >
                {loading ? <Loader /> : "Login"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

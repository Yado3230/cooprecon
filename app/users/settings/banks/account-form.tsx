"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { addBank } from "@/actions/bank.action";
import toast from "react-hot-toast";

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  code: z
    .string()
    .min(1, {
      message: "Code must be at least 1 character.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

export function AccountForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: AccountFormValues) {
    try {
      setLoading(true);

      const response = await addBank(data);
      if (response) {
        toast.success("Bank Created");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="col-span-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 grid border rounded p-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Bank name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder="Bank code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="" type="submit">
            Add Bank
          </Button>
        </form>
      </Form>
    </div>
  );
}

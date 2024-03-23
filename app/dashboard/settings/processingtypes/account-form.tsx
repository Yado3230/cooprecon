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
import toast from "react-hot-toast";
import { addProduct } from "@/actions/product-action";
import { addProcessingType } from "@/actions/processing-action";

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
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

      const response = await addProcessingType(data);
      if (response) {
        toast.success("Processing Type Created");
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
          className="space-y-8 border p-5 grid rounded"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Processing Tx Type name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="" type="submit">
            Add Processing Tx Type
          </Button>
        </form>
      </Form>
    </div>
  );
}

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
import { addServiceStation } from "@/actions/service-station.action";

const accountFormSchema = z.object({
  accountNo: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  product: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  ccy: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  accountOfficer: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  district: z
    .string()
    .min(1, {
      message: "Code must be at least 1 character.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  terminalId: z
    .string()
    .min(1, {
      message: "Code must be at least 1 character.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  machineType: z
    .string()
    .min(1, {
      message: "Code must be at least 1 character.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  clientId: z.coerce.number().default(54),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

const clientId =
  typeof window !== "undefined" && localStorage.getItem("clientId");

export function AccountForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: AccountFormValues) {
    try {
      setLoading(true);

      const response = await addServiceStation({
        accountNo: data.accountNo,
        name: data.name,
        product: data.product,
        ccy: data.ccy,
        accountOfficer: data.accountOfficer,
        district: data.district,
        terminalId: data.terminalId,
        machineType: data.machineType,
        clientId: Number(clientId),
      });
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
            name="accountNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account No</FormLabel>
                <FormControl>
                  <Input placeholder="Account No" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product</FormLabel>
                <FormControl>
                  <Input placeholder="Product" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ccy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CCY</FormLabel>
                <FormControl>
                  <Input placeholder="CCY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountOfficer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Officer</FormLabel>
                <FormControl>
                  <Input placeholder="Account Officer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <FormControl>
                  <Input placeholder="District" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terminalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Terminal ID</FormLabel>
                <FormControl>
                  <Input placeholder="Terminal ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="machineType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Machine Type</FormLabel>
                <FormControl>
                  <Input placeholder="Machine Type" {...field} />
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

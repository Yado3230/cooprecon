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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addProduct, getAllProducts } from "@/actions/product-action";
import { getAllBanks } from "@/actions/bank.action";
import {
  BankResponse,
  CategoryResponse,
  ProductTypeResponse,
} from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addSettlement } from "@/actions/settlement-action";
import { useParams, useRouter } from "next/navigation";
import { getAllCategories } from "@/actions/category-action";

const accountFormSchema = z.object({
  accountName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  accountNumber: z.string().min(1).default(""),
  accountOfficer: z.string().min(1).default(""),
  bankId: z.coerce.number(),
  productTypeId: z.coerce.number(),
  categoryId: z.coerce.number(),
  clientId: z.coerce.number(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

export function SettlementForm() {
  const params = useParams();
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      accountName: "",
      accountNumber: "",
      accountOfficer: "",
      bankId: 0,
      productTypeId: 0,
      categoryId: 0,
      clientId: Number(params.clientId),
    },
  });
  const router = useRouter();
  const [banks, setBanks] = useState<BankResponse[]>([]);
  const [categories, setCategory] = useState<CategoryResponse[]>([]);
  const [products, setProducts] = useState<ProductTypeResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllBanks();
      const data = res instanceof Array ? res : [];
      setBanks(data);
      const res1 = await getAllCategories();
      const data1 = res1 instanceof Array ? res1 : [];
      setCategory(data1);

      const res2 = await getAllProducts();
      const data2 = res2 instanceof Array ? res2 : [];
      setProducts(data2);
    };
    fetchData();
  }, []);

  async function onSubmit(data: AccountFormValues) {
    try {
      setLoading(true);

      const response = await addSettlement(data);
      if (response) {
        toast.success("Settlement Created");
        router;
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="border p-5">
          <div className="grid grid-cols-3 gap-4 rounded">
            <FormField
              control={form.control}
              name="accountName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Account name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Account Number" {...field} />
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
              name="bankId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank:</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value?.toString()}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a bank"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem
                          key={bank.id}
                          value={bank.id?.toString() || ""}
                        >
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Type:</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value?.toString()}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a product type"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem
                          key={product.id}
                          value={product.id?.toString() || ""}
                        >
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category:</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value?.toString()}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a role"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id?.toString() || ""}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="my-5 flex  justify-end" type="submit">
            <span>Add Settlement</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}

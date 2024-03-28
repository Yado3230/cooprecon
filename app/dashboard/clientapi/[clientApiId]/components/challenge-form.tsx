"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddClientApi } from "@/actions/clientapi.action";
import { Client } from "@/types/types";

const formSchema = z.object({
  clientId: z.string().min(1),
  domain: z.string().min(1),
  port: z.string().min(1),
  endpoint: z.string().min(1),
});

interface ChallengeFormProps {
  initialData: any | null;
  clients: Client[];
}

type ChallengeFormValues = z.infer<typeof formSchema>;

export const ChallengeForm: React.FC<ChallengeFormProps> = ({
  initialData,
  clients,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const title = initialData ? "Edit client api" : "Create client api";
  const description = initialData
    ? "Edit a client api"
    : "Add a new client api";
  const toastMessage = initialData
    ? "Client API updated."
    : "Client API created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ChallengeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          clientId: "",
          domain: "",
          port: "",
          endpoint: "",
        },
  });

  const onSubmit = async (data: ChallengeFormValues) => {
    console.log(data);
    try {
      setLoading(true);
      if (initialData) {
        console.log("edit data");
      } else {
        console.log("create data");

        await AddClientApi(data);
      }
      router.refresh();
      router.push(`/dashboard/clientapi`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }

    // revalidateTag("challenges");
  };

  const onDelete = async () => {
    console.log("deleted");
    // try {
    //   setLoading(true);
    //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
    //   router.refresh();
    //   router.push(`/${params.storeId}/products`);
    //   toast.success("Product deleted.");
    // } catch (error) {
    //   toast.error("Something went wrong.");
    // } finally {
    //   setLoading(false);
    //   setOpen(false);
    // }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            disabled={loading}
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client:</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a client"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem
                          key={client.id}
                          value={client.id?.toString() || "000"}
                        >
                          {client.clientName}
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
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Domain url"
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
              name="port"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Port:</FormLabel>
                  <FormControl>
                    <Input placeholder="port" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End-Point:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Endpoint"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

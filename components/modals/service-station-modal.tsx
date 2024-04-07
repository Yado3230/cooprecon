"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { addServiceStation } from "@/actions/service-station.action";
import { useServiceStationModal } from "@/hooks/use-service-station-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type UserModalProps = {
  clientId: number;
};

export const ServiceStationModal: FC<UserModalProps> = ({ clientId }) => {
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
    clientId: z.coerce.number().default(clientId),
  });

  type AccountFormValues = z.infer<typeof accountFormSchema>;

  // This can come from your database or API.
  const defaultValues: Partial<AccountFormValues> = {};
  const serviceStationModal = useServiceStationModal();
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: AccountFormValues) {
    try {
      setLoading(true);

      const response = await addServiceStation(data);
      if (response) {
        toast.success("Service Station Created");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      title="Add Service Station"
      description="Add a new service station"
      isOpen={serviceStationModal.isOpen}
      onClose={serviceStationModal.onClose}
    >
      <div className="col-span-2 w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-6 p-5"
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
                  <FormLabel>Machine Type:</FormLabel>
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
                          placeholder="Select machine type"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="NCR">NCR</SelectItem>
                      <SelectItem value="CRM">CRM</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div></div>
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button
                variant="outline"
                type="button"
                onClick={serviceStationModal.onClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-cyan-500">
                Add Station
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

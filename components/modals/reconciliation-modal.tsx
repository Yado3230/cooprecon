"use client";

import * as z from "zod";
import axios from "axios";

// import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useReconciliationModal } from "@/hooks/use-reconciliation-modal";
import { useRouter } from "next/navigation";
import { AddReconciliation } from "@/actions/reconciliation-action";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
const formSchema = z.object({
  date: z.date(),
  cbs: z.string(),
  eth: z.string(),
  coop: z.string(),
});

interface ReconciliationModalProps {
  clientId: string | string[];
}

export const ReconciliationModal: React.FC<ReconciliationModalProps> = ({
  clientId,
}) => {
  const reconciliationModal = useReconciliationModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   date: null,
    //   cbs: "",
    //   eth: "",
    //   coop: "",
    // },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // try {
    //   setLoading(true);
    //   await AddReconciliation(values);
    //   router.refresh();
    //   reconciliationModal.onClose();
    //   toast.success("Reconciliation Created");
    // } catch (error) {
    //   toast.error("Something went wrong!");
    // } finally {
    //   setLoading(false);
    // }
    console.log(values);
  };

  return (
    <Modal
      title="Add Reconciliation"
      description="Add a new reconciliation"
      isOpen={reconciliationModal.isOpen}
      onClose={reconciliationModal.onClose}
    >
      <div>
        <div className="py-2 pb-4 space-x-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="date"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: number) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="cbs"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CBS:</FormLabel>
                    <FormControl>
                      <Input id="picture" type="file" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="eth"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>EthSwitch:</FormLabel>
                    <FormControl>
                      <Input id="picture" type="file" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="coop"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CoopSwitch:</FormLabel>
                    <FormControl>
                      <Input id="picture" type="file" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end w-full pt-6 space-x-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={reconciliationModal.onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-cyan-500"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

"use client";

import * as z from "zod";
import axios from "axios";

// import { toast } from "react-hot-toast";
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
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useReconciliationModal } from "@/hooks/use-reconciliation-modal";
import { useRouter } from "next/navigation";
import { AddReconciliation } from "@/actions/reconciliation-action";

const formSchema = z.object({
  transactionReference: z.string().min(1),
  amount: z.string(),
  customerAccountNumber: z.string(),
  reversalReference: z.string(),
  interestReference: z.string(),
  letterNo: z.string(),
  operation: z.string(),
  date: z.string().min(1),
  status: z.string().default("pending"),
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
    defaultValues: {
      transactionReference: "",
      amount: "",
      customerAccountNumber: "",
      reversalReference: "",
      interestReference: "",
      letterNo: "",
      operation: "",
      date: "",
      status: "pending",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await AddReconciliation(values);
      router.refresh();
      reconciliationModal.onClose();
      toast.success("Reconciliation Created");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add Reconciliation"
      description="Add a new reconciliation"
      isOpen={reconciliationModal.isOpen}
      onClose={reconciliationModal.onClose}
    >
      <div>
        <div className="spaye-y-4 py-2 pb-4 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="transactionReference"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TXN ID:</FormLabel>
                    <FormControl>
                      <Input placeholder="transaction id" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="customerAccountNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number:</FormLabel>
                    <FormControl>
                      <Input placeholder="customer account number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount:</FormLabel>
                    <FormControl>
                      <Input placeholder="amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="reversalReference"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reversal Reference:</FormLabel>
                    <FormControl>
                      <Input placeholder="reversal reference" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="interestReference"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interest Reference:</FormLabel>
                    <FormControl>
                      <Input placeholder="interest reference" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="letterNo"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Letter No:</FormLabel>
                    <FormControl>
                      <Input placeholder="letterNo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="operation"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operation:</FormLabel>
                    <FormControl>
                      <Input placeholder="operation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="date"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date:</FormLabel>
                    <FormControl>
                      <Input placeholder="Date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
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

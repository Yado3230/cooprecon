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
import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useProcessModal } from "@/hooks/use-process-modal";
import {
  getAllBanksForProcess,
  startProcessing,
} from "@/actions/processing-action";
import { ProcessingResponse } from "@/types/types";

const formSchema = z.object({
  date: z.string().optional(),
  bank: z.string().default(""),
});

type UserModalProps = {
  clientId: number;
  date: string;
};

export const ProcessModal: FC<UserModalProps> = ({ clientId, date }) => {
  const userModal = useProcessModal();
  const [banks, setBanks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [processStarted, setProcessStarted] = useState("pending");
  const [backendResponse, setBackendResponse] = useState<ProcessingResponse>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllBanksForProcess(date);
      const data = res instanceof Array ? res : [];
      setBanks(data);
    };
    fetchData();
  }, [date]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: date,
      bank: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setProcessStarted("started");
      setLoading(true);

      const response = await startProcessing({
        date: date,
        bankName: values.bank,
      });
      if (response) {
        setBackendResponse(response);
      }
      // userModal.onClose();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      setProcessStarted("end");
    }
  };

  return (
    <Modal
      title={`Start Process for : ${date}`}
      description="Start reconcilation"
      isOpen={userModal.isOpen}
      onClose={userModal.onClose}
    >
      {processStarted === "pending" ? (
        <div className="spaye-y-4 py-2 pb-4 w-[400px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid space-y-2"
            >
              <FormField
                name="date"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date:</FormLabel>
                    <FormControl>
                      <Input disabled placeholder={`${date}`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank:</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a bank"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-64">
                        {banks
                          .filter((item) => item !== "")
                          .map((bank) => (
                            <SelectItem key={bank} value={bank}>
                              {bank}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant="outline"
                  type="button"
                  onClick={userModal.onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-cyan-500"
                >
                  Start Process
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : processStarted === "started" ? (
        <div className="w-[400px]">
          <span>
            Your request is being processed. Feel free to leave the page.
          </span>
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button variant="outline" type="button" onClick={userModal.onClose}>
              Leave Page
            </Button>
          </div>
        </div>
      ) : (
        processStarted === "end" && (
          <div className="w-[600px]">
            <div className="grid grid-cols-3 gap-4 items-end">
              <div>
                <span>Done Count</span>
              </div>
              <div>
                <span>{backendResponse?.doneCount}</span>
              </div>
              <div>
                <span>
                  {backendResponse?.doneBirrAmount.toLocaleString()} Birr
                </span>
              </div>
              <div>
                <span>CBS Check EJ Count</span>
              </div>
              <div>
                <span>{backendResponse?.cbsCheckEJCount}</span>
              </div>
              <div>
                <span>
                  {backendResponse?.cbsCheckEJBirrAmount.toLocaleString()} Birr
                </span>
              </div>
              <div>
                <span>ETH Check EJ</span>
              </div>
              <div>
                <span>{backendResponse?.ethCheckEJCount}</span>
              </div>
              <div>
                <span>
                  {backendResponse?.ethCheckEJBirrAmount.toLocaleString()} Birr
                </span>
              </div>
              <div>
                <span>ETH Check Coop Switch</span>
              </div>
              <div>
                <span>{backendResponse?.ethCheckCoopSwitchCount}</span>
              </div>
              <div>
                <span>
                  {backendResponse?.ethCheckCoopSwitchAmount.toLocaleString()}{" "}
                  Birr
                </span>
              </div>
              <div>
                <span>CBS Check Coop Switch</span>
              </div>
              <div>
                <span>{backendResponse?.cbsCheckCoopSwitchCount}</span>
              </div>
              <div>
                <span>
                  {backendResponse?.cbsCheckCoopSwitchBirrAmount.toLocaleString()}{" "}
                  Birr
                </span>
              </div>
              <div className="text-cyan-500">
                <span>Total Transactions</span>
              </div>
              <div className="text-cyan-500">
                <span>
                  {(backendResponse?.doneCount || 0) +
                    (backendResponse?.cbsCheckEJCount || 0) +
                    (backendResponse?.ethCheckEJCount || 0)}{" "}
                  Checked
                </span>
              </div>
              <div className="text-cyan-500">
                <span>
                  {(
                    (backendResponse?.doneBirrAmount || 0) +
                    (backendResponse?.ethCheckEJBirrAmount || 0) +
                    (backendResponse?.cbsCheckEJBirrAmount || 0)
                  ).toLocaleString()}{" "}
                  Birr
                </span>
              </div>
            </div>
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setProcessStarted("pending");
                  userModal.onClose();
                }}
              >
                Close
              </Button>
            </div>
          </div>
        )
      )}
    </Modal>
  );
};

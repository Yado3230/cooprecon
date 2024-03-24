"use client";

import * as z from "zod";
import * as XLSX from "xlsx";

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
import { ChangeEvent, useEffect, useState } from "react";
import { useReconciliationModal } from "@/hooks/use-reconciliation-modal";
import { useParams, useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  UploadExcelFile,
  getTemplateHeaderByClientId,
} from "@/actions/header-template.action";
import { HeaderTemplate } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import toast from "react-hot-toast";
const formSchema = z.object({
  date: z.date(),
  fileType: z.string(),
});

interface ReconciliationModalProps {
  clientId: number;
}

export const ReconciliationModal: React.FC<ReconciliationModalProps> = ({
  clientId,
}) => {
  const reconciliationModal = useReconciliationModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [matcherMessage, setMatcherMessage] = useState("");

  const [headerTemplates, setHeaderTemplates] = useState<HeaderTemplate[] | []>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTemplateHeaderByClientId(Number(clientId));
      const data = response instanceof Array ? response : [];
      setHeaderTemplates(data);
    };
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   date: null,
    //   cbs: "",
    //   eth: "",
    //   coop: "",
    // },
  });

  const parseExcelFile = async (file: File): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const headers: string[] = [];
          //   @ts-ignore
          const range = XLSX.utils.decode_range(sheet["!ref"]);
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = { c: C, r: range.s.r }; // cell address
            const cellRef = XLSX.utils.encode_cell(cellAddress); // construct A1 reference for cell
            const cell = sheet[cellRef]; // actual cell
            headers.push(cell.v);
          }
          resolve(headers);
        } else {
          reject(new Error("Failed to read file."));
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      // Read the selected file
      if (!file) {
        toast.error("Please select File");
        return;
      }
      const headers = await parseExcelFile(file);
      const expectedHeaders = [
        "TRANS_REF",
        "COMPANY_CODE",
        "TRANS_STATUS",
        "ATM_OR_POS",
        "PAN_NUMBER",
        "BIN_REFERENCE",
        "VALUE_DATE",
        "DEBIT_ACCT_NO",
        "DR_CUSTOMER_ID",
        "CREDIT_ACCT_NO",
        "TXN_AMOUNT",
        "MERCHANT_ID",
        "AUTH_CODE",
        "CARD_ACC_ID",
        "RETRIEVAL_REF_NO",
        "ACQ_OR_ISS",
      ];
      // Check if headers match the expected headers
      if (JSON.stringify(headers) === JSON.stringify(expectedHeaders)) {
        setMatcherMessage("");
        console.log(values);
        const date = values.date;
        const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

        const formData = new FormData();
        formData.append("date", dateString);
        formData.append("fileType", values.fileType);
        formData.append("file", file);
        const response = await UploadExcelFile(formData);
        if (response) {
          toast.success("File Uploaded");
          window.location.reload();
        }
        // reconciliationModal.onClose();
      } else {
        setMatcherMessage("File headers do not match expected headers");
        console.log("File headers do not match expected headers.");
      }
    } catch (error) {
      console.error(error);
      // Handle error appropriately, e.g., show error message
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
      <div className="spaye-y-4 py-2 pb-4 w-[400px]">
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
                        disabled={(date: Date) =>
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
              control={form.control}
              name="fileType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Type:</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field?.onChange || ""}
                    value={field.value?.toString()}
                    defaultValue={field.value?.toString() || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a file type"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {headerTemplates.map((role) => (
                        <SelectItem
                          key={role.id}
                          value={role.templateName || ""}
                        >
                          {role.templateName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Excel File:</FormLabel>
              <FormControl>
                {/* <Input id="picture" type="file" {...field} /> */}
                <Input
                  id={`templateFile`}
                  type="file"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setFile(e.target.files ? e.target.files[0] : null);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <div>
              <span className="text-sm text-red-500">{matcherMessage}</span>
            </div>
            <div className="flex items-center justify-end w-full pt-6 space-x-2">
              <Button
                variant="outline"
                type="button"
                onClick={reconciliationModal.onClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-cyan-500">
                Upload
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

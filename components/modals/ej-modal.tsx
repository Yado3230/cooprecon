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
import { HeaderTemplate, ServiceStationResponse } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import toast from "react-hot-toast";
import { useEJModal } from "@/hooks/use-ej-modal";
import { getServiceStationsByClientId } from "@/actions/service-station.action";
const formSchema = z.object({
  date: z.date(),
  station: z.coerce.number(),
});

interface ReconciliationModalProps {
  clientId: number;
}

export const EJModal: React.FC<ReconciliationModalProps> = ({ clientId }) => {
  const reconciliationModal = useEJModal();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [matcherMessage, setMatcherMessage] = useState("");

  const [headerTemplates, setHeaderTemplates] = useState<HeaderTemplate[] | []>(
    []
  );

  const [serviceStations, setServiceStations] = useState<
    ServiceStationResponse[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getServiceStationsByClientId(Number(clientId));
      const data = res instanceof Array ? res : [];
      setServiceStations(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTemplateHeaderByClientId(Number(clientId));
      const data = response instanceof Array ? response : [];
      setHeaderTemplates(data);
    };
    fetchData();
  }, [clientId]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      // Read the selected file
      if (!file) {
        toast.error("Please select File");
        return;
      }

      setMatcherMessage("");
      const date = values.date;
      const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

      const formData = new FormData();
      formData.append("date", dateString);
      formData.append("station", values.station.toString());
      formData.append("file", file);
      const response = await UploadExcelFile(formData);
      if (response) {
        toast.success("File Uploaded");
        window.location.reload();
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
      title="Upload EJ File"
      description="Add new EJ File"
      isOpen={reconciliationModal.isOpen}
      onClose={reconciliationModal.onClose}
    >
      <div className="spaye-y-4 py-2 pb-4 w-full">
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
              name="station"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Station:</FormLabel>
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
                          placeholder="Select service station"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-72">
                      {serviceStations.map((station) => (
                        <SelectItem
                          key={station.id}
                          value={station.accountOfficer || ""}
                        >
                          {station.accountOfficer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Upload File:</FormLabel>
              <FormControl>
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

"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as XLSX from "xlsx";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import {
  AddTemplateHeader,
  getTemplateHeaderByClientId,
} from "@/actions/header-template.action";
import toast from "react-hot-toast";
import ClientReconciliation from "./components/client";
import { HeaderTemplate } from "@/types/types";
import { ClientColumn } from "./components/columns";
import { Heading } from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Template {
  templateName: string;
  file: File | null;
  headers: string[];
  rrn: string;
}

const FormSchema = z.object({
  email: z.string().optional(),
});

const ReconciliationExcelModalCaller: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([
    { templateName: "", file: null, headers: [], rrn: "" },
  ]);
  const [headerTemplates, setHeaderTemplates] = useState<HeaderTemplate[] | []>(
    []
  );
  const params = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [updated, setUpdated] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [amountValue, setAmountValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTemplateHeaderByClientId(
        Number(params.clientId)
      );
      const data = response instanceof Array ? response : [];
      setHeaderTemplates(data);
    };
    fetchData();
  }, [updated]);

  const handleTemplateNameChange = (index: number, value: string) => {
    const updatedTemplates = [...templates];
    updatedTemplates[index].templateName = value;
    setTemplates(updatedTemplates);
  };

  const handleTemplateFileChange = async (index: number, file: File | null) => {
    const updatedTemplates = [...templates];
    updatedTemplates[index].file = file;
    if (file) {
      const headers = await parseExcelFile(file);
      updatedTemplates[index].headers = headers;
    }
    setTemplates(updatedTemplates);
  };

  const handleKeySelect = (index: number, rrn: string) => {
    console.log(index, rrn);
    const updatedTemplates = [...templates];
    updatedTemplates[index].rrn = rrn;
    setTemplates(updatedTemplates);
  };

  const handleAddTemplate = () => {
    setTemplates([
      ...templates,
      { templateName: "", file: null, headers: [], rrn: "" },
    ]);
  };

  const handleRemoveTemplate = (index: number) => {
    const updatedTemplates = [...templates];
    updatedTemplates.splice(index, 1);
    setTemplates(updatedTemplates);
  };

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

  const validateTemplates = (): boolean => {
    for (const template of templates) {
      if (
        template.templateName === "" ||
        template.file === null ||
        template.rrn === ""
      ) {
        return false;
      }
    }
    return true;
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("new one", data);
    if (!validateTemplates()) {
      toast.error("Please fill out all fields before saving.");
      return;
    }

    const response = await AddTemplateHeader({
      clientId: params?.clientId,
      fileTemplates: templates,
    });
    if (response) {
      setUpdated(!updated);
      toast.success("Created Succesfully");
      setTemplates([{ templateName: "", file: null, headers: [], rrn: "" }]);
    } else {
      toast.error("failed to add header template");
    }
  };

  const formattedclients: ClientColumn[] = headerTemplates.map((item) => ({
    id: item.id,
    templateName: item.templateName,
    rrnColumn: item.rrnColumn,
    createdAt: new Date(item.createdAt).toISOString().split("T")[0],
  }));

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-5">
        <Heading
          title={`File Template`}
          description="Manage header file template"
        />
      </div>
      <div className="col-span-3">
        <ClientReconciliation data={formattedclients} />
      </div>
      <div className="border col-span-2 rounded shadow grid grid-cols-12 gap-6 p-5 bg-gray-50 pb-20">
        <div className="col-span-12 text-xl text-cyan-600 border-b">
          Create New Template
        </div>
        {templates.map((template, index) => (
          <div
            className="grid gap-2 grid-cols-12 col-span-12 items-end space-x-4"
            key={index}
          >
            <div className="col-span-5">
              <Label htmlFor={`templateName-${index}`}>Template Name</Label>
              <Input
                id={`templateName-${index}`}
                placeholder="Name"
                value={template.templateName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleTemplateNameChange(index, e.target.value)
                }
              />
            </div>
            <div className="col-span-6">
              <Label htmlFor={`templateFile-${index}`}>Header Template</Label>
              <Input
                id={`templateFile-${index}`}
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleTemplateFileChange(
                    index,
                    e.target.files ? e.target.files[0] : null
                  );
                }}
              />
            </div>
            <div className="p-1">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveTemplate(index)}
                >
                  <Trash className="w-4 h-4 text-red-500" />
                </button>
              )}
            </div>
            {template.headers.length > 0 && (
              <div className="col-span-12">
                <Label
                  htmlFor={`headerSelect-${index}`}
                  className="text-cyan-500 text-xl py-2 my-2"
                >
                  Select Unique Key
                </Label>
                <div>
                  <div className="grid grid-cols-2">
                    {template.headers.map((header, index2) => (
                      <div key={index2} className="">
                        <div className="flex items-center space-x-2">
                          {/* <RadioGroupItem value={header} id="r1" />
                          <Label htmlFor="r1">{header}</Label> */}
                          <div className="flex items-center mb-4">
                            <input
                              id={`default-radio-${index2 + 1}`}
                              type="radio"
                              value={header}
                              name={`header`}
                              onChange={(e) =>
                                handleKeySelect(index, e.target.value)
                              }
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor={`default-radio-${index + 1}`}
                              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              {header}
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a Date" />
                            </SelectTrigger>
                            <SelectContent className="h-72">
                              <SelectGroup>
                                <SelectLabel>Headers</SelectLabel>
                                {template.headers.map((header, index3) => (
                                  <SelectItem key={index3} value={header}>
                                    {header}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a Amount Value" />
                            </SelectTrigger>
                            <SelectContent className="h-72">
                              <SelectGroup>
                                <SelectLabel>Headers</SelectLabel>{" "}
                                {template.headers.map((header, index4) => (
                                  <SelectItem key={index4} value={header}>
                                    {header}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReconciliationExcelModalCaller;
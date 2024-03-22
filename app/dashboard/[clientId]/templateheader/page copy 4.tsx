"use client";

import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as XLSX from "xlsx";
import { Ticket, Trash } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useParams } from "next/navigation";
import { AddTemplateHeader } from "@/actions/header-template.action";
import toast from "react-hot-toast";

interface Template {
  templateName: string;
  file: File | null;
  headers: string[];
  rrn: string;
}

const ReconciliationExcelModalCaller: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([
    { templateName: "", file: null, headers: [], rrn: "" },
  ]);

  const params = useParams();

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

  const hanleSaveAll = async () => {
    const response = await AddTemplateHeader({
      clientId: params?.clientId,
      fileTemplates: templates,
    });
    if (response) {
      toast.success("Created Succesfully");
      setTemplates([                                                   
        ...templates,
        { templateName: "", file: null, headers: [], rrn: "" },
      ]);
    } else {
      toast.error("failed to add header template");
    }
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

  return (
    <>
      <div className="border rounded shadow grid grid-cols-4 gap-6 p-5 bg-gray-50 pb-20">
        {templates.map((template, index) => (
          <div
            className="grid gap-4 grid-cols-12 col-span-4 items-end space-x-4"
            key={index}
          >
            <div className="col-span-3">
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
            <div className="col-span-3">
              <Label htmlFor={`templateFile-${index}`}>Header Template</Label>
              <Input
                id={`templateFile-${index}`}
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleTemplateFileChange(
                    index,
                    e.target.files ? e.target.files[0] : null
                  );
                  console.log(e.target.files);
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
                  Select RRN
                </Label>
                <div>
                  <div className="grid grid-cols-3">
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
              </div>
            )}
          </div>
        ))}
        <div className="col-span-4 space-x-2 flex justify-center mt-6">
          <Button
            className="bg-green-500 text-white"
            onClick={handleAddTemplate}
          >
            Add
          </Button>
          <Button
            className="bg-cyan-500 text-white"
            onClick={() => hanleSaveAll()}
          >
            Save All
          </Button>
        </div>
      </div>
    </>
  );
};

export default ReconciliationExcelModalCaller;

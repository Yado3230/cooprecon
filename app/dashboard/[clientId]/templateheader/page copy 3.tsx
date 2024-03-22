"use client";

import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as XLSX from "xlsx";
import { Ticket, Trash } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Template {
  name: string;
  file: File | null;
  headers: string[];
  selectedKey: string | null;
}

const ReconciliationExcelModalCaller: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([
    { name: "", file: null, headers: [], selectedKey: null },
  ]);

  const handleTemplateNameChange = (index: number, value: string) => {
    const updatedTemplates = [...templates];
    updatedTemplates[index].name = value;
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

  const handleKeySelect = (index: number, selectedKey: string) => {
    const updatedTemplates = [...templates];
    updatedTemplates[index].selectedKey = selectedKey;
    setTemplates(updatedTemplates);
  };

  const handleAddTemplate = () => {
    setTemplates([
      ...templates,
      { name: "", file: null, headers: [], selectedKey: null },
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
                value={template.name}
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
                  <RadioGroup
                    defaultValue="comfortable"
                    className="grid grid-cols-3"
                  >
                    {template.headers.map((header, index) => (
                      <div key={index} className="">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={header} id="r1" />
                          <Label htmlFor="r1">{header}</Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
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
            onClick={handleAddTemplate}
          >
            Save All
          </Button>
        </div>
      </div>
    </>
  );
};

export default ReconciliationExcelModalCaller;

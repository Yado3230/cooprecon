import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as XLSX from "xlsx";

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
          for (const key in sheet) {
            if (key[0] === "A") {
              headers.push(sheet[key].v);
            }
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
            key={index}
            className="grid w-full max-w-sm items-center gap-1.5"
          >
            <Label htmlFor={`templateName-${index}`}>Template Name</Label>
            <Input
              id={`templateName-${index}`}
              placeholder="Name"
              value={template.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleTemplateNameChange(index, e.target.value)
              }
            />
            <Label htmlFor={`templateFile-${index}`}>Header Template</Label>
            <Input
              id={`templateFile-${index}`}
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleTemplateFileChange(
                  index,
                  e.target.files ? e.target.files[0] : null
                )
              }
            />
            {template.headers.length > 0 && (
              <div>
                <Label htmlFor={`headerSelect-${index}`}>Select Key</Label>
                <select
                  id={`headerSelect-${index}`}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleKeySelect(index, e.target.value)
                  }
                >
                  <option value="">Select Key</option>
                  {template.headers.map((header, i) => (
                    <option key={i} value={header}>
                      {header}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {index > 0 && (
              <button type="button" onClick={() => handleRemoveTemplate(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <div className="col-span-4 flex justify-center mt-6">
          <Button
            className="bg-cyan-500 text-white"
            onClick={handleAddTemplate}
          >
            Add Template
          </Button>
        </div>
      </div>
    </>
  );
};

export default ReconciliationExcelModalCaller;

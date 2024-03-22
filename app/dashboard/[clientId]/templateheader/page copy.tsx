"use client";
import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";

interface Template {
  name: string;
  file: File | null;
}

const ReconciliationExcelModalCaller: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([
    { name: "", file: null },
  ]);

  const handleTemplateNameChange = (index: number, value: string) => {
    const updatedTemplates = [...templates];
    updatedTemplates[index].name = value;
    setTemplates(updatedTemplates);
  };

  const handleTemplateFileChange = (index: number, file: File | null) => {
    const updatedTemplates = [...templates];
    updatedTemplates[index].file = file;
    setTemplates(updatedTemplates);
  };

  const handleAddTemplate = () => {
    setTemplates([...templates, { name: "", file: null }]);
  };

  const handleRemoveTemplate = (index: number) => {
    const updatedTemplates = [...templates];
    updatedTemplates.splice(index, 1);
    setTemplates(updatedTemplates);
  };

  return (
    <>
      <div className="border rounded shadow grid grid-cols-4 gap-6 p-5 bg-gray-50 pb-20">
        {templates.map((template, index) => (
          <div className="flex col-span-3 items-center space-x-4" key={index}>
            <div className="">
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
            <div className="">
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
            </div>
            <div className="border">
              <button type="button" onClick={() => console.log("first")}>
                Process
              </button>
            </div>
            <div className="">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveTemplate(index)}
                >
                  <Trash className="w-4 h-4" />
                </button>
              )}
            </div>
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

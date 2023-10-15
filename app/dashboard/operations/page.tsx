"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const DynamicJSONForm: React.FC = () => {
  // State variables
  const [formData, setFormData] = useState<{
    [topLevelKey: string]: {
      [sectionKey: string]: { [fieldKey: string]: string };
    };
  }>({});
  const [topLevelKey, setTopLevelKey] = useState("");
  const [sectionKey, setSectionKey] = useState("");
  const [fieldKey, setFieldKey] = useState("");
  const [clientId, setClientId] = useState("");
  const [operation, setOperation] = useState("");

  // Add a new section
  const handleAddSection = () => {
    if (sectionKey.trim() !== "" && topLevelKey.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        [topLevelKey]: {
          ...prevData[topLevelKey],
          [sectionKey]: {},
        },
      }));
      setSectionKey("");
    }
  };

  // Remove a section
  const handleRemoveSection = (sectionName: string) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      delete updatedData[topLevelKey][sectionName];
      return updatedData;
    });
  };

  // Add a new field to a section
  const handleAddField = (sectionName: string) => {
    if (fieldKey.trim() !== "" && topLevelKey.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        [topLevelKey]: {
          ...prevData[topLevelKey],
          [sectionName]: {
            ...prevData[topLevelKey][sectionName],
            [fieldKey]: "",
          },
        },
      }));
      setFieldKey("");
    }
  };

  // Remove a field from a section
  const handleRemoveField = (sectionName: string, fieldName: string) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      delete updatedData[topLevelKey][sectionName][fieldName];
      return updatedData;
    });
  };

  // Handle input changes for field values
  const handleFieldChange = (
    sectionName: string,
    fieldName: string,
    value: string
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [topLevelKey]: {
        ...prevData[topLevelKey],
        [sectionName]: {
          ...prevData[topLevelKey][sectionName],
          [fieldName]: value,
        },
      },
    }));
  };

  // Generate and log the JSON object
  const generateJSON = () => {
    console.log(formData);
  };

  const jsonData = {
    TopLevelKey: {
      SectionKey1: {
        FieldKey1: "Field value1",
        FieldKey2: "Field value2",
      },
      SectionKey2: {
        FieldKey1: "Field value1",
      },
    },
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="border col-span-2 p-2">
        <h3 className="text-2xl font-mono text-cyan-500 border-b pb-1 mb-2">
          Create Operation
        </h3>
        <div className="grid grid-cols-2 gap-2 mr-4">
          <div className="flex flex-col">
            <label className="mx-2">Client:</label>
            <input
              type="text"
              className="bg-gray-50 border m-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
              placeholder="Client"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="mx-2">Operation:</label>
            <input
              type="text"
              placeholder="Operation"
              className="bg-gray-50 border m-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
            />
          </div>
        </div>
        <h1>Dynamic JSON Request Body</h1>
        <div className="flex items-center">
          <input
            type="text"
            className="bg-gray-50 border m-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-1/2 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
            placeholder="Top-Level Key"
            value={topLevelKey}
            onChange={(e) => setTopLevelKey(e.target.value)}
          />
          <input
            type="text"
            placeholder="Section Key"
            className="bg-gray-50 border m-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-1/2 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
            value={sectionKey}
            onChange={(e) => setSectionKey(e.target.value)}
          />
          <Button
            className="whitespace-nowrap m-2 bg-cyan-500"
            size="sm"
            onClick={handleAddSection}
          >
            Add Section
          </Button>
        </div>
        {Object.keys(formData[topLevelKey] || {}).map((sectionName) => (
          <div
            key={sectionName}
            className="section border p-2 my-2 bg-gray-100 rounded"
          >
            <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-2">
              <h2 className="px-2 text-xl">{sectionName}</h2>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveSection(sectionName)}
              >
                Remove {sectionName}
              </Button>
            </div>
            {Object.keys(formData[topLevelKey][sectionName]).map(
              (fieldName) => (
                <div key={fieldName} className="flex items-center space-x-2">
                  <label className="mx-2">{fieldName}:</label>
                  <input
                    type="text"
                    className="bg-gray-50 border my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-1/2 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                    value={formData[topLevelKey][sectionName][fieldName]}
                    onChange={(e) =>
                      handleFieldChange(sectionName, fieldName, e.target.value)
                    }
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveField(sectionName, fieldName)}
                  >
                    Remove
                  </Button>
                </div>
              )
            )}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Field Key"
                className="bg-gray-50 border my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-1/2 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                value={fieldKey}
                onChange={(e) => setFieldKey(e.target.value)}
              />
              <Button
                className="m-2 bg-cyan-500"
                size="sm"
                onClick={() => handleAddField(sectionName)}
              >
                Add Field
              </Button>
            </div>
          </div>
        ))}

        <Button
          className="m-2 bg-cyan-500 flex self-end"
          // size="sm"
          onClick={generateJSON}
        >
          Submit
        </Button>
      </div>
      <div className="flex  flex-col space-y-2">
        <div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="mb-2">Example</div>
            <pre className="text-xs font-mono bg-gray-200 p-2">
              {JSON.stringify(jsonData, null, 2)}
            </pre>
          </div>
        </div>
        <div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="mb-2">Your Generated JSON</div>
            <pre className="text-xs font-mono bg-gray-200 p-2">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicJSONForm;

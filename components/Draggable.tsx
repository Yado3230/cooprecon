"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { FileType } from "@/types/types";
import { EditFileType, getAllFileTypes } from "@/actions/file-type.acion";
import { FileTypeForm } from "./file-type-form";
import toast from "react-hot-toast";

export default function Home() {
  // const [people, setPeople] = useState([
  //   {
  //     id: 1,
  //     name: "ETH-SWITCH",
  //     order: 1,
  //     selected: true,
  //   },
  //   {
  //     id: 2,
  //     name: "CBS",
  //     order: 2,
  //     selected: true,
  //   },
  //   {
  //     id: 3,
  //     name: "COOP-SWITCH",
  //     order: 3,
  //     selected: true,
  //   },
  // ]);

  const [fileType, setFileType] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllFileTypes();
      const data = res instanceof Array ? res : [];
      // Sort the data by the order property
      data.sort((a, b) => a.order - b.order);
      setFileType(data);
    };
    fetchData();
  }, []);

  const dragPerson = useRef<number>(0);
  const draggedOverPerson = useRef<number>(0);

  function handleSort() {
    const peopleClone = [...fileType];
    const temp = peopleClone[dragPerson.current];
    peopleClone[dragPerson.current] = peopleClone[draggedOverPerson.current];
    peopleClone[draggedOverPerson.current] = temp;
    setFileType(
      peopleClone.map((person, index) => ({ ...person, order: index + 1 }))
    );
  }

  async function handleEdit() {
    try {
      setLoading(true);

      const response = await EditFileType(fileType);
      if (response) {
        toast.success("Success");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log(fileType);
  }, [fileType]);

  const handleKeySelect = (index: number, checked: boolean) => {
    const updatedTemplates = [...fileType];
    updatedTemplates[index].selected = checked;
    setFileType(updatedTemplates);
  };

  return (
    <main className="">
      <h1 className="text-xl font-bold text-cyan-500">
        List of Templates Type
      </h1>
      <div className="grid grid-cols-2 gap-6">
        <div>
          {fileType.map((person, index) => (
            <div key={index} className="grid grid-cols-12">
              <div
                className="relative flex items-center justify-between col-span-12 space-x-3 rounded m-1 p-2 border"
                draggable
                onDragStart={() => (dragPerson.current = index)}
                onDragEnter={() => (draggedOverPerson.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="col">
                  <p>{person.name}</p>
                </div>
                <div className="col">
                  <input
                    id={`default-radio-${index + 1}`}
                    type="checkbox"
                    checked={person.selected}
                    name={`header`}
                    onChange={(e) => handleKeySelect(index, e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <FileTypeForm />
        </div>
      </div>
      <Button
        disabled={loading}
        className="p-2 float-left bg-cyan-500"
        size="sm"
        onClick={() => handleEdit()}
      >
        Update Changes
      </Button>
    </main>
  );
}

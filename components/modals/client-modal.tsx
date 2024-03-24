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
import { useClientModal } from "@/hooks/use-client-modal";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { AddClient } from "@/actions/client.action";

const formSchema = z.object({
  clientName: z.string().min(1),
  description: z.string().default(""),
});

export const ClientModal = () => {
  const clientModal = useClientModal();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log(selectedFile);

    if (!selectedFile) {
      setError(""); // Clear any previous error
      return;
    }

    // Image type validation
    if (!selectedFile.type.startsWith("image/")) {
      setError("Selected file is not an image.");
      return;
    }

    // Image size validation (in bytes)
    const maxSize = 1 * 1024 * 1024; // 1MB
    if (selectedFile.size > maxSize) {
      setError("Selected image is too large.");
      return;
    }

    // Load image to check width
    const img = new Image();
    img.onload = () => {
      setFile(selectedFile);
      setError("");
    };
    img.src = URL.createObjectURL(selectedFile);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values, file);
    if (!file) {
      toast.error("Please select a file");
      return;
    }
    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("clientName", values.clientName);
    // formData.append("description", values.description);

    try {
      setLoading(true);
      if (!file) {
        return toast.error("Please select file");
      } else {
        const response = await AddClient(values, file);
        if (response) {
          toast.success("Client Created");
          window.location.reload();
        }
      }
      clientModal.onClose();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add Client"
      description="Add a new client"
      isOpen={clientModal.isOpen}
      onClose={clientModal.onClose}
    >
      <div>
        <div className="spaye-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex items-center justify-center w-[400px] mb-2">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <input
                    type="file"
                    id="dropzone-file"
                    hidden
                    onChange={handleFileChange}
                  />
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {file ? (
                      <>
                        <NextImage
                          width={300}
                          height={150}
                          style={{
                            width: "100%",
                            height: "200",
                          }}
                          src={URL.createObjectURL(file)}
                          className="h-24"
                          alt={file.name}
                        />
                      </>
                    ) : (
                      <>
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to logo</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 1200px)
                        </p>
                      </>
                    )}
                  </div>
                </label>
              </div>
              <FormField
                name="clientName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name:</FormLabel>
                    <FormControl>
                      <Input placeholder="client name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description:</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your description here."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant="outline"
                  type="button"
                  onClick={clientModal.onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-cyan-500"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

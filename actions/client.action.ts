import { Client } from "@prisma/client";

export const getAllClients = async (): Promise<Client[]> => {
  try {
    const res = await fetch(`/api/clients`, {
      cache: "no-cache",
      next: { tags: ["clients"] },
    });
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const AddClient = async (data: any, file: File): Promise<Client> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("clientName", data.clientName);
  formData.append("description", data.description);

  try {
    const response = await fetch(`api/clients`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

import { Client } from "@/types/types";

export const getAllClientApis = async (): Promise<Client[]> => {
  try {
    const res = await fetch(`/api/clientapi`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const AddClientApi = async (data: any): Promise<Client> => {
  try {
    const response = await fetch(`/api/clientapi`, {
      method: "POST",
      body: JSON.stringify(data),
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

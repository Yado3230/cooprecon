import { Client } from "@prisma/client";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllBanks = async (): Promise<Client[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/clients`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const getBanksByClientId = async (clientId: number): Promise<Client[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/clients/${clientId}`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const addBank = async (data: any, file: File): Promise<Client> => {
  const token = localStorage.getItem("access_token");
  const formData = new FormData();
  formData.append("logo", file);
  formData.append("clientName", data.clientName);
  formData.append("description", data.description);

  try {
    const response = await fetch(`${API_URL}api/v1/clients`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
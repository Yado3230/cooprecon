import { BankRequest, BankResponse } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllBanks = async (): Promise<BankResponse[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/clients`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getBanksByClientId = async (
  clientId: number
): Promise<BankResponse[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/clients/${clientId}`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const addBank = async (data: BankRequest): Promise<BankResponse> => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await fetch(`${API_URL}api/v1/clients`, {
      method: "POST",
      body: JSON.stringify(data),
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
    throw error;
  }
};

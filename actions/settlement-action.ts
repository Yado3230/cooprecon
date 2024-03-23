import {
  SettlementSettingRequest,
  SettlementSettingResponse,
} from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllSettlements = async (): Promise<
  SettlementSettingResponse[]
> => {
  try {
    const res = await fetch(`${API_URL}api/v1/product-types`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getSettlementByClientId = async (
  clientId: number
): Promise<SettlementSettingResponse[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/product-types/${clientId}`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const addSettlement = async (
  data: SettlementSettingRequest
): Promise<SettlementSettingResponse> => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await fetch(`${API_URL}api/v1/product-types`, {
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

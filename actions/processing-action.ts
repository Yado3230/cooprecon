import {
  ProcessingTransactionTypeRequest,
  ProcessingTransactionTypeResponse,
} from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllProcessingTypes = async (): Promise<
  ProcessingTransactionTypeResponse[]
> => {
  try {
    const res = await fetch(`${API_URL}api/v1/processing-transaction-types`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllBanks = async (): Promise<string[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/recon/info/banks`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getProcessingTypeByClientId = async (
  clientId: number
): Promise<ProcessingTransactionTypeResponse[]> => {
  try {
    const res = await fetch(
      `${API_URL}api/v1/processing-transaction-types?clientId=${clientId}`
    );
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const addProcessingType = async (
  data: ProcessingTransactionTypeRequest
): Promise<ProcessingTransactionTypeResponse> => {
  const token =
    typeof window !== "undefined" && localStorage.getItem("access_token");

  try {
    const response = await fetch(
      `${API_URL}api/v1/processing-transaction-types`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

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

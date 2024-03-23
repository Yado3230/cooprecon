import { ProductTypeRequest, ProductTypeResponse } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllProducts = async (): Promise<ProductTypeResponse[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/product-types`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getProductsByClientId = async (
  clientId: number
): Promise<ProductTypeResponse[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/product-types/${clientId}`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const addProduct = async (
  data: ProductTypeRequest
): Promise<ProductTypeResponse> => {
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

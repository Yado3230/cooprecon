import { CategoryRequest, CategoryResponse } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllCategories = async (): Promise<CategoryResponse[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/categories`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getCategoriesByClientId = async (
  clientId: number
): Promise<CategoryResponse[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/categories/${clientId}`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const addCategory = async (
  data: CategoryRequest
): Promise<CategoryResponse> => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await fetch(`${API_URL}api/v1/categories`, {
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

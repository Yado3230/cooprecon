import { Reconciliation } from "@prisma/client";
import { useParams } from "next/navigation";

const URL = `/api`;
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllReconciliations = async (
  clientId: String
): Promise<Reconciliation[]> => {
  try {
    const res = await fetch(`${URL}/${clientId}/reconciliations`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const getReconsiliation = async (
  id: string
): Promise<Reconciliation> => {
  try {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const AddReconciliation = async (data: any): Promise<Reconciliation> => {
  const params = useParams();

  // console.log(id, data);
  try {
    const response = await fetch(`${URL}/${params.client}/reconciliations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
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

export const updateCategory = async (
  id: string,
  data: Reconciliation
): Promise<Reconciliation> => {
  // console.log(id, data);
  try {
    console.log("URL", URL);
    const response = await fetch(`${URL}/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      body: JSON.stringify(data),
    });

    // revalidateTag("categorys");

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

import { Operation } from "@prisma/client";

export const getAllOperations = async (): Promise<Operation[]> => {
  try {
    const res = await fetch(`/api/operations`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const getOperationsByClientId = async (
  id: string
): Promise<Operation[]> => {
  try {
    const res = await fetch(`/api/operations${id}`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const AddOperation = async (
  data: any,
  bodyData: object
): Promise<Operation> => {
  const newData = {
    clientId: data.clientId,
    operation: data.operation,
    bodyData: bodyData,
  };
  try {
    const response = await fetch(`/api/operations`, {
      method: "POST",
      body: JSON.stringify(newData),
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

import { FileType, FileTypeRequest } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllFileTypes = async (): Promise<FileType[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/file-types`);
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const AddFileType = async (data: FileTypeRequest): Promise<FileType> => {
  try {
    const response = await fetch(`${API_URL}api/v1/file-types`, {
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

export const EditFileType = async (data: FileType[]): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}api/v1/file-types`, {
      method: "PUT",
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

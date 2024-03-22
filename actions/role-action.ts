import { Role } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllRoles = async (): Promise<Role[]> => {
  try {
    const res = await fetch(`${API_URL}api/roles?size=1000`);
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteRole = async (id: number): Promise<[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/roles/delete/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

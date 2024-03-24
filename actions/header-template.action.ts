import {
  HeaderTemplate,
  HeaderTemplateRequest,
  NewReconProcessTracker,
  TransactionFile,
} from "@/types/types";
import { Client } from "@prisma/client";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getTemplateHeaderByClientId = async (
  clientId: number
): Promise<HeaderTemplate[]> => {
  const token =
    typeof window !== "undefined" && localStorage.getItem("access_token");
  try {
    const res = await fetch(
      `${API_URL}api/v1/file-upload/templates?clientId=${clientId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const getReconsilationProcessingTracker = async (
  clientId: number
): Promise<NewReconProcessTracker> => {
  const token =
    typeof window !== "undefined" && localStorage.getItem("access_token");
  try {
    const res = await fetch(
      `${API_URL}api/v1/recon-trackers/process?size=1000`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const getReconsilationApprocalTracker = async (
  reconTrackerId: number
): Promise<TransactionFile[]> => {
  const token =
    typeof window !== "undefined" && localStorage.getItem("access_token");
  try {
    const res = await fetch(
      `${API_URL}api/v1/recon-processing/file-approvals?reconTrackerId=${reconTrackerId}&size=1000`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const AddTemplateHeader = async (
  data: any
): Promise<HeaderTemplateRequest> => {
  const token =
    typeof window !== "undefined" && localStorage.getItem("access_token");
  try {
    const response = await fetch(`${API_URL}api/v1/file-upload/templates`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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

export const reconTrackerApproval = async (
  id: number
): Promise<HeaderTemplateRequest> => {
  const token =
    typeof window !== "undefined" && localStorage.getItem("access_token");
  try {
    const response = await fetch(
      `${API_URL}api/v1/recon-trackers/${id}/approve-file`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const UploadExcelFile = async (
  data: FormData
): Promise<HeaderTemplateRequest> => {
  const token =
    typeof window !== "undefined" && localStorage.getItem("access_token");
  try {
    const response = await fetch(`${API_URL}api/v1/file-uploads/read-excel`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
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

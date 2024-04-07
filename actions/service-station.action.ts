import { ServiceStationRequest, ServiceStationResponse } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllServiceStations = async (): Promise<
  ServiceStationResponse[]
> => {
  try {
    const res = await fetch(`${API_URL}api/v1/client/self-service-stations`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getServiceStationsByClientId = async (
  clientId: number
): Promise<ServiceStationResponse[]> => {
  try {
    const res = await fetch(
      `${API_URL}api/v1/client/self-service-stations?clientId=${clientId}`
    );
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const addServiceStation = async (
  data: ServiceStationRequest
): Promise<ServiceStationResponse> => {
  const token =
    typeof window !== "undefined" && localStorage.getItem("access_token");

  try {
    const response = await fetch(
      `${API_URL}api/v1/client/self-service-stations`,
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

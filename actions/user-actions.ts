// import { UserRequest, UserResponse } from "@/types/types";

import { EditUserRequest, UserRequest, UserResponse } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Login {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

// export const getAllUsers = async (): Promise<UserResponse[]> => {
//   try {
//     const res = await fetch(`${API_URL}api/users?size=1000`);
//     const responseData = await res.json();
//     return responseData;
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// };

export const getAllUsers = async (
  clientId: number
): Promise<UserResponse[]> => {
  try {
    const token = 
    typeof window !== "undefined" && localStorage.getItem("access_token");
    const res = await fetch(
      `${API_URL}api/v1/users?clientId=${clientId}&size=1000`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const createUser = async (data: UserRequest): Promise<UserResponse> => {
  try {
    const response = await fetch(`${API_URL}api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    throw error;
  }
};
export const editUser = async (
  data: EditUserRequest
): Promise<UserResponse> => {
  const access_token = 
  typeof window !== "undefined" && localStorage.getItem("access_token");
  try {
    const response = await fetch(`${API_URL}api/v1/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
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
    throw error;
  }
};

export const resetPassword = async (
  password: String,
  username: string
): Promise<UserResponse> => {
  try {
    const response = await fetch(`${API_URL}api/v1/accounts/reset-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        username,
      }),
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

export const getMe = async (
  access_token: string | null
): Promise<UserResponse> => {
  try {
    const response = await fetch(`${API_URL}api/v1/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
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

export const deleteUser = async (id: string): Promise<Boolean> => {
  try {
    const res = await fetch(`${API_URL}api/v1/users/${id}`, {
      method: "POST",
    });
    if (!res.ok) {
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const responseData = res.ok;
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const logUser = async (data: Login): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}login`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Please check your username and password.");
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    if (error instanceof TypeError) {
      console.log(error);
      throw new Error("Network error: Unable to connect to the server.");
    } else {
      console.error("Error:", error);
      throw error; // Rethrow the error to handle it in the caller
    }
  }
};

type ChangePasswordProps = {
  newPassword: string;
  oldPassword: string;
};

export const changePassword = async (
  values: ChangePasswordProps,
  id: number
): Promise<{
  httpStatus: string;
  message: string;
}> => {
  try {
    const res = await fetch(
      `${API_URL}api/v1/accounts/change-password?roleId=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const blockUser = async (
  userId: string
): Promise<{
  httpStatus: string;
  message: string;
}> => {
  try {
    const res = await fetch(`${API_URL}api/users/activate-block/${userId}`, {
      method: "PUT",
    });
    if (!res.ok) {
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

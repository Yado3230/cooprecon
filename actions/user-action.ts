interface Login {
  username: string;
  password: string;
}
interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

const URL = `${process.env.NEXT_PUBLIC_API}`;

export const logUser = async (data: Login): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${URL}/login`, {
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
      throw new Error("Network error: Unable to connect to the server.");
    } else {
      console.error("Error:", error);
      throw error; // Rethrow the error to handle it in the caller
    }
  }
};

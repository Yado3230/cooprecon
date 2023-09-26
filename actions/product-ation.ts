import { Product } from "@/types";
import { revalidateTag } from "next/cache";

const URL = `${process.env.NEXT_PUBLIC_API}/api/productCatalog`;
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${URL}/getProductCatalogs`, {
      cache: "no-cache",
      next: { tags: ["products"] },
    });
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const getProduct = async (id: string): Promise<Product> => {
  try {
    const res = await fetch(`${URL}/${id}`, {
      cache: "no-cache",
      next: { tags: ["products"] },
    });
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const AddProduct = async (
  data: Product,
  file: File
): Promise<Product> => {
  // const newBody = {
  //   productName: data.productName,
  //   productLogo: file?.name,
  //   description: data.description,
  //   createdAt: Date.now(),
  // };
  const inputString: string = data.playstoreLink;

  // Find the index of "id="
  const idIndex: number = inputString.indexOf("id=");
  // Extract the substring after "id="
  const desiredString: string = inputString.substring(idIndex + 3) || "";

  const formData = new FormData();
  formData.append("productName", data.productName);
  formData.append("productLogo", file.name);
  formData.append("description", data.description);
  formData.append(
    "playstoreLink",
    desiredString.length > 0 ? desiredString : data.playstoreLink
  );
  formData.append("logoFile", file);
  formData.append("createdAt", String(data.createdAt));

  // console.log(id, data);
  try {
    const response = await fetch(`${URL}/addProductCataloge`, {
      method: "POST",
      body: formData,
    });

    // revalidateTag("products");
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

export const updateProduct = async (
  id: string,
  data: Product,
  file: any
): Promise<Product> => {
  // console.log(id, data);

  const inputString: string = data.playstoreLink;

  // Find the index of "id="
  const idIndex: number = inputString.indexOf("id=");
  // Extract the substring after "id="
  const desiredString: string = inputString.substring(idIndex + 3) || "";

  const formData = new FormData();
  formData.append("productName", data.productName);
  formData.append("productLogo", file.name);
  formData.append("description", data.description);
  formData.append(
    "playstoreLink",
    desiredString.length > 0 ? desiredString : data.playstoreLink
  );
  formData.append("logoFile", file);
  formData.append("createdAt", String(data.createdAt));

  try {
    console.log("URL", URL);
    const response = await fetch(`${URL}/edit/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const responseData = await response.json();
    // revalidateTag("products");
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

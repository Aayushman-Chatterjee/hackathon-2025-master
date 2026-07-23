import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Define a basic structure for the API response and request data
interface ApiResponse<T> {
  data: T;
  message?: string;
  status: string;
}

// Create an Axios instance
const api = axios.create({
  baseURL: "https://hackathon-be-v6-1082494551684.us-central1.run.app/api", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// GET request wrapper
export const getRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.get(url, config);
    return response.data.data; // Assuming 'data' is the property containing the desired result
  } catch (error) {
    console.error(`Error with GET request to ${url}:`, error);
    throw new Error(`Failed to fetch data from ${url}`);
  }
};

// POST request wrapper
export const postRequest = async <T, U>(
  url: string,
  data: T,
  config?: AxiosRequestConfig
): Promise<U> => {
  try {
    const response: AxiosResponse<ApiResponse<U>> = await api.post(
      url,
      data,
      config
    );
    return response.data.data; // Assuming 'data' contains the result in the response body
  } catch (error) {
    console.error(`Error with POST request to ${url}:`, error);
    throw new Error(`Failed to post data to ${url}`);
  }
};

import { getRequest, postRequest } from "./axios.utils";

// Define the type for the User data (adjust this as per your API response structure)
interface User {
  id: number;
  name: string;
  email: string;
  // Add other fields if needed
}

// Get User Data
export const getUserData = async (userId: number): Promise<User> => {
  try {
    const res = await getRequest<User>(`/users/${userId}`);
    return res;
  } catch (error) {
    throw new Error(`Failed to fetch user data for userId ${userId}`);
  }
};

// Save User Data
export const saveUserData = async (
  userId: number,
  payload: Partial<User>
): Promise<User> => {
  try {
    const res = await postRequest<Partial<User>, User>(
      `/users/${userId}`,
      payload
    );
    return res;
  } catch (error) {
    throw new Error(`Failed to save user data for userId ${userId}`);
  }
};

export const saveUserDataINdb = async (
  userId: number,
  payload: Partial<User>
): Promise<User> => {
  try {
    const res = await postRequest<Partial<User>, User>(
      `/users/${userId}`,
      payload
    );
    return res;
  } catch (error) {
    throw new Error(`Failed to save user data for userId ${userId}`);
  }
};

import { getRequest, postRequest } from "./api";

export const getUserData = async (userId: string) => {
  let res = await getRequest(`/users/${userId}`);
  return res;
};

export const saveUserData = async (userId: string, payload: any, flag: any) => {
  payload["use_llm"] = flag || false;

  let res = await postRequest(`/users/${userId}`, payload);
  return res;
};

export const checkUserUpodates = async (userId: string) => {
  let res = userId && (await getRequest(`/jobs/${userId}`));
  return res;
};

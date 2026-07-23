import axios from "axios";
 
const api = axios.create({
    baseURL: "https://hackathon-be-v6-1082494551684.us-central1.run.app/api", // Replace with your API base URL
    headers: {
        "Content-Type": "application/json",
    },
});
 
// GET request wrapper
export const getRequest = async (url:string, config?:any) => {
    try {
        const response = await api.get(url, config);
        return response.data;
    } catch (error) {
        console.error(`Error with GET request to ${url}:`, error);
        throw new Error(`Failed to fetch data from ${url}`);
    }
};
 
// POST request wrapper
export const postRequest = async (url:string, data:any, config?:any) => {
    try {
        const response = await api.post(url, data, config);
        return response.data;
    } catch (error) {
        console.error(`Error with POST request to ${url}:`, error);
        throw new Error(`Failed to post data to ${url}`);
    }
};
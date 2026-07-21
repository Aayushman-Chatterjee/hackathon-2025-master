import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hackathon-llm-v1-1082494551684.us-central1.run.app', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET request wrapper
export const getRequest = async (url: string, config?: any) => {
  try {
    console.info(`[apiService.getRequest.url]:`, url);
    console.info(`[apiService.getRequest.config]:`, config);

    const response = await api.get(url, config);

    console.info(`[apiService.getRequest.response]:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`[apiService.getRequest.error]:`, error);
    throw new Error(`Failed to fetch data from ${url}`);
  }
};

// POST request wrapper
export const postRequest = async (url: string, data: any, config?: any) => {
  try {
    console.info(`[apiService.postRequest.url]:`, url);
    console.info(`[apiService.postRequest.data]:`, data);
    console.info(`[apiService.postRequest.config]:`, config);

    const response = await api.post(url, data, config);

    console.info(`[apiService.postRequest.response]:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`[apiService.postRequest.error]:`, error);
    throw new Error(`Failed to post data to ${url}`);
  }
};

import { postRequest } from '../axios.utils';

// # Get full analysis
// response = requests.post(
//     "https://hackathon-llm-v1-1082494551684.us-central1.run.app/analyze",
//     json=profile_data
// )

export const sendUserDataToLLMService = async (data: any) => {
  try {
    console.info(`[llmService.sendUserDataToLLMService.data]:`, data);

    const res = await postRequest('/analyze', data);

    console.info(`[llmService.sendUserDataToLLMService.response]:`, res);
    return res;
  } catch (error) {
    console.error(`[llmService.sendUserDataToLLMService.error]:`, error);
    throw new Error('Failed to send user data to LLM.');
  }
};

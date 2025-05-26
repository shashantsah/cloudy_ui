import axios from "axios";

const BASE_URL = "https://new-api.tensorweave.com/api/v1";

export const fetchInitialSuggestion = async (text: string) => {
 const { data } = await axios.post(
  `${BASE_URL}/check/`,
   {"text":text},
);

  return data; // expect { trigger: boolean, suggestion: string }
};

export const pollWebSuggestion = async (text: string):  Promise<{ status: string; [key: string]: any }| null> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/check/web?request_id=${text}`);
    return data || null;
  } catch {
    return null;
  }
};

export const pollWritingSuggestion = async (text: string): Promise<{ status: string; [key: string]: any }| null> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/check/writing?request_id=${text}`);
    return data || null;
  } catch {
    return null;
  }
};

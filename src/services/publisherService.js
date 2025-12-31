import AxiosConfig from '../axiosConfig.js';

const RESOURCE = '/publishers';

export async function getAllPublishers() {
  const response = await AxiosConfig.get(RESOURCE);
  
  return response.data;
}
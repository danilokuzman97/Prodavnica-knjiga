import AxiosConfig from '../axiosConfig.js';

const API_URL = '/api/Authors'; 

export const getAllAuthors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getAuthorById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createAuthor = async (authorData) => {
  const response = await axios.post(API_URL, authorData);
  return response.data;
};

export const updateAuthor = async (id, authorData) => {
  const response = await axios.put(`${API_URL}/${id}`, authorData);
  return response.data;
};

export const deleteAuthor = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
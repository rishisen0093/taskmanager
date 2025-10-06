import axios from "axios";

const BASE_URL = "http://localhost:4000/api/notes";

export const getNotes = async (query = "") => {
  const response = await axios.get(`${BASE_URL}?search=${query}`);
  return response.data;
};

export const createNote = async (note) => {
  const response = await axios.post(BASE_URL, note);
  return response.data;
};

export const updateNoteAPI = async (id, updatedNote) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedNote);
  return response.data;
};

export const deleteNoteAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

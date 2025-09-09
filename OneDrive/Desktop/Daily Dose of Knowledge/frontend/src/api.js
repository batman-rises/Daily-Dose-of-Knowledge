import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getQuote = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/quote`);
    return res.data;
  } catch (e) {
    console.log("Error in fetching quote", e);
    throw e;
  }
};

export const getFact = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/fact`);
    return response.data;
  } catch (error) {
    console.error("Error fetching fact:", error);
    throw error;
  }
};

export const getJoke = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/joke`);
    return response.data;
  } catch (error) {
    console.error("Error fetching joke:", error);
    throw error;
  }
};

export const getWord = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/word`);
    return response.data;
  } catch (error) {
    console.error("Error fetching word:", error);
    throw error;
  }
};

export const getFavorites = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/favorites`);
    return res.data;
  } catch (e) {
    console.log("Error in fetching favorites", e);
    throw e;
  }
};

export const saveFavorite = async (payload) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/favorites`, payload);
    return response.data;
  } catch (e) {
    console.log("Error Saving Favorite", e);
    throw e;
  }
};
const deleteFavorite = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/favorites/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting favorite:", error);
    throw error;
  }
};

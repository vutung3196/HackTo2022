import axios from "axios";

const API_URL = "https://annaostapenko.github.io/HackTo2022-BackEnd/data/fatal.json";
const API_GEO_URL = "https://annaostapenko.github.io/HackTo2022-BackEnd/data/fatal_geo.json";

const getAreaData = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const getPointData = async () => {
  const response = await axios.get(API_GEO_URL);
  return response.data;
};

export default {
  getPointData, getAreaData
};
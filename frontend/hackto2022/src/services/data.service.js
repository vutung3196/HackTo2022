import axios from "axios";

const API_URL = "https://annaostapenko.github.io/HackTo2022-BackEnd/data/fatal_geo.json";

const getData = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


export default {
  getData
};
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDBkODUzNTJmMWM0YzcwYWQ5MjU2ZjY2YzhhMTNkMSIsInN1YiI6IjY0YTFlOGE4NGE1MmY4MDBjOTk1NDUyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IH8g2FBv2Q5r0CAbzy77JS_G9qfMIIl8-9wkr1vjr6g",
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } =await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};


import axios from "axios";

/** Setup axios globally */
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`;

export default axios;

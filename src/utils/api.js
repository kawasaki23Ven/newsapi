
import axios from "axios";
import SnackbarUtils from '../components/snackbar';


function truncatePhrase(phrase, length) {
  if (phrase.length <= length) {
    return phrase
  }
  return `${phrase.slice(0, length)}...`;
}

const axiosManager = axios.create({
  baseURL: "https://newsapi.org/v2/",
  responseType: "json",
  headers: {
    'X-Api-Key': 'fcef57bded8b4bc99b235575e4e1bb24'
  },
});

axiosManager.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    SnackbarUtils.error( truncatePhrase(error.response.data.message || "Something went wrong! :(", 50));
  });




export default axiosManager;



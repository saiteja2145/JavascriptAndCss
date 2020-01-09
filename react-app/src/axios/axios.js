import axios from "axios";
import {
  axiosFailureResponseHandler,
  axiosSuccessResponseHandler
} from "./axiosResponseHandler";

let token = "";
export const axiosInstance = axios.create();

const getCookie = () => {
  var name = "ssid=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
};

export const setToken = () => {
  token = getCookie();
  axiosInstance.defaults.headers["security"] = token;
  return token;
};

async function sendAxiosRequest(url, data, history) {
  let result = await axiosInstance
    .post(url, data)
    .then(res => {
      axiosSuccessResponseHandler(res, history);
      return res;
    })
    .catch(err => {
      axiosFailureResponseHandler(err, history);
      return false;
    });
  return result;
}
export default sendAxiosRequest;

//For Reference
/* const getData = async () => {
  const jsonData = {
    system: {
      monitor: {
        productId: ""
      }
    }
  };
  let data = await sendAxiosRequest(
    "/socketCommunication",
    jsonData,
    history
  );
  console.log(data);
};
const history = useHistory();
 useEffect(() => {
  getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);  */

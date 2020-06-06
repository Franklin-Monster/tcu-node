import Axios from 'axios'

Axios.defaults.baseURL = "http://localhost:8081" 
Axios.defaults.timeout = 10000;   
Axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"
 
Axios.defaults.transformRequest = function(data) {
    let ret = "";
    for (let it in data) {
      ret +=
        encodeURIComponent(it) +
        "=" +
        encodeURIComponent(data[it]) +
        "&";
    }
    return ret;
  }
export default Axios
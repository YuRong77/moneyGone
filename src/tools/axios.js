import axios from "axios";

export const GET = (url) => {
  return new Promise((resolved, reject) => {
    axios
      .get(url, {
        headers: {
          authorization: window.sessionStorage.getItem("Authorization"),
        },
      })
      .then((res) => {
        resolved(res.data);
      })
      .catch((err) => reject(err.response.data));
  });
};

export const POST = (url, params) => {
  return new Promise((resolved, reject) => {
    axios
      .post(url, params, {
        headers: {
          authorization: window.sessionStorage.getItem("Authorization"),
        },
      })
      .then((res) => {
        resolved(res.data);
      })
      .catch((err) => reject(err.response.data));
  });
};

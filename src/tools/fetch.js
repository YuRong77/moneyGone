export const GET = (url) => {
  return new Promise((resolved, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: window.sessionStorage.getItem("Authorization"),
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else
          throw new Error(`回傳碼 ${res.status} | 網路狀態 ${res.statusText}`);
      })
      .catch((error) => reject(error))
      .then((data) => {
        if (data && data.Unauthorization === true) return reject(data);
        else return resolved(data);
      });
  });
};

export const POST = (url, params) => {
  return new Promise((resolved, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: window.sessionStorage.getItem("Authorization"),
      },
      body: JSON.stringify(params),
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else
          throw new Error(`回傳碼 ${res.status} | 網路狀態 ${res.statusText}`);
      })
      .catch((error) => reject(error))
      .then((data) => {
        if (data && data.Unauthorization === true) return reject(data);
        else return resolved(data);
      });
  });
};

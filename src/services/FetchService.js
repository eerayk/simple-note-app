const customFetch = (method, url, postData = {}) => {
  let requestOptions = {};
  if (method === "POST" || method === "PUT") {
    requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };
  } else if (method === "GET" || method === "DELETE") {
    requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  return fetch(url, requestOptions);
};

export default customFetch;

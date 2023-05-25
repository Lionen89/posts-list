const url = 'https://api.stackexchange.com/2.2/search?intitle=react&site=stackoverflow';

async function handleResponse(res) {
  const result = await res.json();
  return res.ok ? result : Promise.reject(result);
}

const getData = () => {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(url, requestOptions).then((response) => handleResponse(response));
};
export { getData };

import qs from "query-string";

const pageSize = 100;

function callGitlab(token, url, payload = undefined, method = "get") {
  const headers = new Headers();
  headers.append("Private-Token", token);

  return fetch(
    url + (payload ? "?" + qs.stringify(payload) : ""),
    { method, headers }
  ).then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response;
  });
}

/**
 * @param {String} token
 * @param {String} url
 * @param {Object} payload
 * @param {Number} page          Internal, do not use
 * @param {Array}  recursiveData Internal, do not use
 *
 * @return {Promise} Promise resolving to aggregated data as an object
 */
function fetchGitlab(token, url, payload = undefined, page = 1, recursiveData = []) {
  let totalPages;

  return callGitlab(token, url, { ...payload, "per_page": pageSize, page })
    .then(response => {
      totalPages = parseInt(response.headers.get("x-total-pages"));

      return response.json();
    })
    .then(data => {
      recursiveData = [...recursiveData, ...data];

      if ((!isNaN(totalPages) && page >= totalPages) || data.length < pageSize) {
        return recursiveData;
      }

      return fetchGitlab(token, url, payload, page + 1, recursiveData);
    });
}

export { callGitlab, fetchGitlab };

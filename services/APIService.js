const {
  config: { api },
  API_TIMEOUT,
} = require("../config");

const axios = require("axios");
const { processSearchResponse, processItemResponse } = require("./APIHelpers");

const get = (endpoint, { params } = {}) => {
  return axios
    .get(api + endpoint, { params, timeout: API_TIMEOUT })
    .then((results) => {
      return results.data;
    });
};

const search = (query) => {
  return get("/sites/MLA/search", { params: { q: query } }).then((response) =>
    processSearchResponse(response)
  );
};

const _getItem = (id) => {
  return get("/items/" + id);
};
const _getItemDescription = (id) => {
  return get("/items/" + id + "/description");
};
const _getCategories = (categoryId) => {
  return get("/categories/" + categoryId);
};

const getItem = (id) => {
  const request = [_getItem(id), _getItemDescription(id)];
  return Promise.all(request).then((results) => {
    const [item, description] = results;
    const { category_id } = item;
    return _getCategories(category_id).then((categories) => {
      return processItemResponse(item, description, categories);
    });
  });
};

module.exports = { search, getItem };

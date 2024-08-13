const { AUTHOR } = require("../config");

const processPictures = (pictures = []) => {
  return pictures.map((picture) => picture.secure_url);
};
const processItem = (item) => {
  const {
    id,
    title,
    price,
    currency_id,
    thumbnail,
    condition,
    shipping,
    sold_quantity,
    pictures,
    address,
  } = item;

  return {
    id,
    title,
    price: {
      currency: currency_id,
      amount: Math.trunc(price),
      decimal: Math.round((price % 1) * 100) / 100,
    },
    picture: thumbnail && thumbnail.replace("http://", "https://"),
    condition,
    free_shipping: shipping.free_shipping,
    sold_quantity,
    pictures: processPictures(pictures),
    address: address && address.state_name,
  };
};
const processItems = (items) => items.map(processItem);
const processSearchCategories = (categories) => {
  try {
    return categories
      .find((filter) => filter.id === "category")
      .values[0].path_from_root.map((category) => category.name);
  } catch (e) {
    return [];
  }
};
const processSearchResponse = (data) => {
  const { filters, results } = data;
  return {
    author: AUTHOR,
    categories: processSearchCategories(filters),
    items: processItems(results),
  };
};

const processDescription = (description) => description.plain_text;
const processItemCategories = (categories) => {
  return categories.path_from_root.map((category) => category.name);
};

const processItemResponse = (item, description, categories) => {
  return {
    author: AUTHOR,
    item: {
      ...processItem(item),
      description: processDescription(description),
      categories: processItemCategories(categories),
    },
  };
};

module.exports = {
  processSearchResponse,
  processItemResponse,
};

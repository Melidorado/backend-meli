const config = {
  port: process.env.PORT || 8080,
  api: "https://api.mercadolibre.com",
};

const API_TIMEOUT = 15000;

const AUTHOR_NAME = "Melissa";
const AUTHOR_LASTNAME = "Dorado";
const AUTHOR = {
  name: AUTHOR_NAME,
  lastname: AUTHOR_LASTNAME,
};

module.exports = { config, AUTHOR, API_TIMEOUT };

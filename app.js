const express = require("express");
const APIService = require("./services/APIService");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
server.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/items", (req, res) => {
  const search = req.query.q;
  APIService.search(search)
    .then((results) => res.json(results))
    .catch((e) => {
      if (e.response) {
        console.error(e.response.data);
        res.status(e.response.status).json(e.response.data);
      } else {
        console.error(e);
        res.status(500).json(e.message);
      }
    });
});

const port = 8080;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

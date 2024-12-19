require("dotenv").config();
const app = require("./app");

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);

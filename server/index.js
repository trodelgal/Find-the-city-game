require("dotenv").config();
const app = require('./app');

console.log(process.env.DB_PASSWORD);
console.log(process.env.MYSQL_DATABASE);
console.log(process.env.MYSQL_USER);
console.log(process.env.MYSQL_HOST);
console.log(process.env.SERVER_PORT);

const port = process.env.SERVER_PORT || 8080

app.listen(port, () => console.log(`app listening at http://localhost:${port}`));
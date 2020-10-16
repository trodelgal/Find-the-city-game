const express = require('express');
const app = express();
const fs = require('fs').promises;
const citiesInfo = './csvjson.json';

app.use(express.json());
const products = []

app.get('/api/cities', async (req, res) =>{
    const content = await fs.readFile(citiesInfo);
    const cities = JSON.parse(content)
    res.send(cities);
})

const port = 8080;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

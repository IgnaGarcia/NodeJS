const express = require('express');
const router = express.Router();
const app = express();

app.get("/", (req, res) => {
    res.write("some");
    res.end();
});

app.get("/user", (req, res) => {
    res.write(`user`);
    res.end();
});

router.get("/:name", (req, res) => {
    const { name } = req.params;
    res.write(`hola ${name}`);
    res.end();
});

app.use('/user', router);
app.listen(8000);
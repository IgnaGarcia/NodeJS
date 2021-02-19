const express = require('express');
const router = express.Router();
const app = express();
const userList = require('./data').users;

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.write("Ejecucion correcta");
    res.end();
});

app.get("/users", (req, res) => {
    res.status(200).json(userList)
    res.end();
});

app.post("/users", async (req, res) => {
    if(req.body && Object.keys(req.body).length > 0) {
        await userList.push(req.body);
        res.status(200).json(req.body);
    }
    else res.status(400).json({ message: "No se encuentra el Usuario" })

    res.end();
});

router.get("/:name", (req, res) => {
    const { name } = req.params;
    res.write(`hola ${name}`);
    res.end();
});

app.use('/user', router);
app.listen(8000, () => console.log("Server is ON in http://localhost:8000"));
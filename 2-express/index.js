const express = require('express');
const router = express.Router();
const app = express();
var userList = require('./data').users;

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
    return res.write("Ejecucion correcta");
});

router.get("/", async (req, res) => {
    return await res.status(200).json(userList);
});

router.get("/:id", async (req, res) => {
    const { id = null } = req.params;
    if(!userList[id]) return res.status(404).json({ message : `El Usuario ${id} no existe` });
    return res.status(200).json(userList[id]);
});

router.post("/", async (req, res) => {
    if(req.body && Object.keys(req.body).length > 0) {
        await userList.push(req.body);
        return res.status(200).json(req.body);
    }
    else return res.status(400).json({ message: "No se encuentra el Usuario" });
});

router.put("/:id", (req, res) => {
    const { id = null} = req.params;
    if(!userList[id]) return res.status(404).json({ message : `No se encuentra el Usuario ${id}` });
    else if(req.body && Object.keys(req.body).length > 0) {
        userList[id] = req.body;
        return res.status(200).json(req.body);
    }
    else return res.status(400).json({ message : "No se recibio al Usuario" });
});

router.delete("/:id", (req, res) => {
    const { id = null} = req.params;
    if(!userList[id]) return res.status(404).json({ message : `No se encuentra el Usuario ${id}` });
    else{
        userList = userList.filter((_user, index) => index!= id);
        return res.status(204).json({ message : `Usuario ${id} eliminado con exito`});
    }
});

app.use('/users', router);
app.listen(8000, () => console.log("Server is ON in http://localhost:8000"));
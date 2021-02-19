const apiRoutes =  require('./api-routes');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
    return res.write("Ejecucion correcta");
});


app.use(apiRoutes);
app.listen(8000, () => console.log("Server is ON in http://localhost:8000"));
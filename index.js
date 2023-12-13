const express = require("express");
const routerLivres = require("./routes/routerLivres");

const app = express();

app.use(express.json());

app.use("/", routerLivres)

app.listen(8080, () => {
    console.log("Server started");
});

// utilisation d'un routeur Express
const express = require("express");
const routerLivres = express.Router();

// utilisation du controller de gestion des livres
const controllerLivres =
require("../controller/controllerLivres");

// --> utiliser la méthode liste du controlleur
routerLivres.get("/", controllerLivres.simple);

// -- route pour la liste des livres
// --> utiliser la méthode liste du controlleur
routerLivres.get("/livres", controllerLivres.listeLivres);

// -- route donne toutes les caractéristiques d'un livre
routerLivres.get("/livres/:numero", controllerLivres.livreSpe);

// -- route donne toutes les pages d'un livre
routerLivres.get("/livres/:numero/pages", controllerLivres.livreSpePages);

// -- route donne page spé d'un livre
routerLivres.get("/livres/:numero/pages/:page", controllerLivres.livreSpePagesPageSpe);

// -- route d'ajout de livre
routerLivres.post("/livres", controllerLivres.addLivre);

// -- route de modif de livre
routerLivres.put("/livres/:numero", controllerLivres.modifLivre);

// -- route pour la suppression
routerLivres.delete("/livres/:numero", controllerLivres.delLivre);

module.exports = routerLivres ;
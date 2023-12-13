// utilisation du Model Livre pour faire le lien avec la BD
const modelLivres = require("../models/modelLivres.js");

const simple = (req, res)=>{
    const retour = "Bienvenue sur l'API de gestion des livres"
    res.json(retour)
}

// Mise en place du schéma JOI
const Joi = require('joi');
const schema = Joi.object({
    numero: Joi.number().required(),
    titre: Joi.string().required(),
    pages: Joi.array().items(Joi.string()).required(),
});


// -- liste des tous les Livress
const listeLivres = async (req, res) => {
const liste = await modelLivres.listeLivres()
res.json(liste)
};


const livreSpe = async (req, res) => {
    const numero = req.params.numero;
    const livre = await modelLivres.livreSeul(numero);
    res.json(livre);
}

const livreSpePages = async (req, res) => {
    const numero = req.params.numero;
    const livre = await modelLivres.livreSeulPage(numero);
    res.json(livre);
}

const livreSpePagesPageSpe = async (req, res) => {
    const numero = req.params.numero;
    const page = req.params.page;
    const livre = await modelLivres.livreSeulPagePageSpe(numero, page);
    res.json(livre);
}

const addLivre = async (req, res) =>{
    const result = req.body;

    // Vérification du schéma des données avec Joi

    const { value, error } = schema.validate(result);

    if (error == undefined) {
    const livre = await modelLivres.ajoutLivre(result)
    res.json(livre)
    }else{
        res.status(400).json({message : "L'une des valeurs n'est pas conforme ou inexistante"})
    }
}

const modifLivre = async (req, res) =>{
    const numero = req.params.numero;
    const result = req.body;
    
    // Vérification du schéma des données avec Joi

    const { value, error } = schema.validate(result);

    if (error == undefined) {
    const livre = await modelLivres.modifLivre(numero, result)
    res.json(livre)
    }else{
        res.status(400).json({message : "L'une des valeurs n'est pas conforme ou inexistante"})
    }
}

// -- suppression d'un livre à partir de son numero

const delLivre = async (req, res) => {
    const numero = req.params.numero;
    const livre = await modelLivres.deleteLivre(numero);
    res.json(livre);
}


module.exports = { simple, listeLivres, livreSpe, livreSpePages, livreSpePagesPageSpe, addLivre, modifLivre, delLivre }
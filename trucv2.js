// // utilisation du module et tentative de connexion
// const nano = require('nano')('http://Jules:MICHEL@127.0.0.1:5984');

// // choix d’une base de données
// const dbLivres = nano.db.use('livres');

// console.log(dbLivres)

// // -- utilisation du module Express
// const express = require("express");
// const app = express();


// app.use(express.json());


// // lancement du serveur web qui écoute sur le port 8080
// app.listen(8080, () => {
//     console.log("Server started");
// });

// app.get("/", (req, res) => {
//     res.json({ message: "API de gestion des livres" });
// });

// app.get("/livres", async (req, res) => {
//     const query = {
//         'selector': {},
//         'fields': ['numero', 'titre', 'pages']
//     }
//     let livres = await dbLivres.find(query)
//     res.json(livres)
// });

// app.get("/livres/:numero", async (req, res) => {
//     let numero = parseInt(req.params.numero);
//     if (numero) {
//         const query = {
//             'selector': { "numero": numero },
//             'fields': ['numero', 'titre', 'pages', '_id']
//         }
//         let livres = await dbLivres.find(query)

//         // REFAIRE LA FONCTION DE VERIFICATION SI LE LIVRE EXISTE

//         if (livres.docs.length > 0) {
//             res.json(livres)
//         } else {
//             res.status(404).json({ message: "Aucun livre trouvé avec ce numéro" })
//         }
//     }
// });

// app.get("/livres/:numero/pages", async (req, res) => {

//     let numero = parseInt(req.params.numero);

//     if (numero) {
//         const query = {
//             "selector": { "numero": numero },
//             'fields': [`pages`],
//         }
//         let livres = await dbLivres.find(query)
//         res.json(livres)
//     }

// });


// app.get("/livres/:numero/pages/:page", async (req, res) => {

//     let numero = parseInt(req.params.numero);
//     let page = req.params.page;

//     if (numero) {
//         if (page) {
//             const query = {
//                 "selector": { "numero": numero },
//                 'fields': [`pages.${page}`],
//             }
//             let livres = await dbLivres.find(query)
//             if (livres.docs[0].pages) {
//                 res.json(livres)
//             } else {
//                 res.status(404).json({ message: "La page que vous recherchez n'existe pas" })
//             }
//         }
//     } else {
//         res.json({ message: "Il faut un numéro de livre" })
//     }

// });

// app.post("/livres", async (req, res) => {
//     let result = req.body;

//     if (result) {
//         await dbLivres.insert(result)
//         res.status(200).json({ message: "Livre ajouté" })
//     } else {
//         res.status(404).json({
//             message: "Y a rien dans le body"
//         })
//     }
// });

// app.put("/livres/:numero", async (req, res) => {
//     let numero = req.params.numero;

//     let result = req.body;

//     const query = {
//         "selector": { "numero": parseInt(numero) },
//         'fields': ["_id","_rev"],
//     }
//     let livre = await dbLivres.find(query);

//     let id = livre.docs[0]._id;
//     let rev = livre.docs[0]._rev;

//     if (result) {

//         result._id = id;
//         result._rev = rev;

//         await dbLivres.insert(result)
//         res.json({ message: "Le livre à été modifié" })

//     } else {
//         res.status(404).json({
//             message: "Y a rien dans le body"
//         })
//     }
// });

// app.delete("/livres/:numero", async (req, res) => {


//     let numero = req.params.numero;


//     const query = {
//         "selector": { "numero": parseInt(numero) },
//         'fields': ["_id","_rev"],
//     }
//     let livre = await dbLivres.find(query);

//     let id = livre.docs[0]._id
//     let rev = livre.docs[0]._rev
    
//     if (livre) {

//         await dbLivres.destroy(id, rev)
//         res.json({ message: "Le livre à été supprimé" })

//     } else {
//         res.status(404).json({
//             message: "Y a rien dans le body"
//         })
//     }   
// });
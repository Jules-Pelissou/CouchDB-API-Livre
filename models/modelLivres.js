// utilisation du module et tentative de connexion
const nano = require('nano')('http://Jules:MICHEL@127.0.0.1:5984');

// choix d’une base de données
const dbLivres = nano.db.use('livres');

// -- Route simple sans /[...]

// -- tous les Livres
const listeLivres = () => {
    const query = {
        'selector': {},
        'fields': ['numero', 'titre', 'pages']
    }
    let livres = dbLivres.find(query)
    return livres
};

// -- Livre seul
const livreSeul = (numero) => {
    const query = {
        'selector': { "numero": parseInt(numero) },
        'fields': ['numero', 'titre', 'pages']
    }
    let livres = dbLivres.find(query)

    // Ici la gestion d'erreur ne fonctionne pas
    // la bonne chose a faire serait if (livres.docs.length !== 0 ) => renvoyer le livre sinon envoyer le msg d'erreur
    // Néanmoins cette condition n'a pas l'air de fonctionner.
    
    if (livres) {
        return livres
    } else {

        return ({ message: "Le livre que vous recherchez n'existe pas" })
    }
}

const livreSeulPage = (numero) => {
    const query = {
        'selector': { "numero": parseInt(numero) },
        'fields': ['pages']
    }
    let livres = dbLivres.find(query)

    return livres
}

const livreSeulPagePageSpe = async (numero, page) => {
    const query = {
        "selector": { "numero": parseInt(numero) },
        'fields': [`pages.${parseInt(page)}`],
    }
    let livres = await dbLivres.find(query)
    if (livres.docs[0].pages) {
        return (livres)
    } else {

        // Gestion de l'erreur si la page n'existe pas.
        // La gestion d'erreur par du principe que l'utilisateur est assez intelligent pour rechercher une page spé d'un livre existant comme l'url le laisse présager

        return ({ message: "La page que vous recherchez n'existe pas" })
    }
}

const ajoutLivre = async (result) => {


    // Cherche si le livre existe

    let num = result.numero;
    const query = {
        "selector": { "numero": parseInt(num) },
        'fields': [`titre`],
    }
    let livre = await dbLivres.find(query)

    if (livre.docs.length !== 0) {
        return ({ message: `Impossible d'ajouter le livre le numéro ${num} est déjà pris` })
    } else {
        await dbLivres.insert(result)
        return ({ message: "Livre ajouté" })
    }
}

const modifLivre = async (numero, result) => {

    const query = {
        "selector": { "numero": parseInt(numero) },
        'fields': ["_id", "_rev"],
    }
    let livre = await dbLivres.find(query);

    if (livre.docs.length !== 0) {
        let id = livre.docs[0]._id;
        let rev = livre.docs[0]._rev;

        if (result) {

            result._id = id;
            result._rev = rev;

            await dbLivres.insert(result)
            return ({ message: "Le livre à été modifié" })

        } else {
            return ({
                message: "Y a rien dans le body"
            })
        }
    } else {
        return ({ message: `Le livre n°${numero} n'existe pas, il est impossible de le modifier` })
    }


}

// -- suppression d'un Livre s'il existe
const deleteLivre = async (numero) => {

    const query = {
        "selector": { "numero": parseInt(numero) },
        'fields': ["_id", "_rev"],
    }
    let livre = await dbLivres.find(query);

    if (livre.docs.length !== 0) {
        const id = livre.docs[0]._id;
        const rev = livre.docs[0]._rev;

        await dbLivres.destroy(id, rev)
        return ({ message: "Le livre à été supprimé" })
    } else {
        return ({ message: `Le livre n°${numero} n'existe pas, il est impossible de le supprimer` })
    }



};






module.exports = { listeLivres, livreSeul, livreSeulPage, livreSeulPagePageSpe, ajoutLivre, modifLivre, deleteLivre };
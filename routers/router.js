const express = require('express')
const User = require('../models/modelUser')
const Admin = require('../models/modelAdmin')
const Commande = require('../models/modelCommande')
const CommandeAdmin = require('../models/modelCommandeAdmin')
const path = require("path")
const sgMail = require('@sendgrid/mail'); //sendgrid
require('dotenv').config(); // Assurez-vous que 'dotenv' est installé
const router = express.Router()
const bcrypt = require('bcrypt');
const { log } = require('console')

//sendgrid key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//PAGE D'ACCEUIL
router.get('/', (req, res) => {
    res.render('acceuil/index', {title: 'Acceuil'})  
})


//PAGE DE CONNEXION
router.get("/connexion", (req, res)=>{
    res.render('connexion/index', {title: 'Connexion'}) 
})

//PAGE QUI RECOIT LES INPUT DANS LA PAGE DE CONNEXION
router.post("/resto/connexion", (req,res)=>{

    //les coordonnées rentrées
    const inputEmail = req.body.email
    const inputPassword = req.body.password

    

    //pour verifier si ça appartient à la table User
    const user = User.findOne({where:{
        email: inputEmail,
        motDePasse: inputPassword
    }})
        .then(user=>{
            if(user){
                console.log("Utilisteur trouvé dans la table User!");
                res.render("clt/index", {title: "client", name: user.nom, lastName: user.prenom, email: user.email})
            }
            else{
                console.log("Utilisateur non trouvé dans la table User!");
                
            }
        })
        .catch(error=>{
            console.log("Connexion echoué:" + error);
            res.send("Connexion echoué veuillez rééssayer")
            res.render('connexion/index', {title: 'Connexion'})
        })


        //pour verifier si ça appartient à la table Admin
        const admin = Admin.findOne({where:{
            email: inputEmail,
            motDePasse: inputPassword
        }})
            .then(admin=>{
                if(admin && inputPassword!="admin"){
                    console.log("Utilisteur trouvé dans la table Admin!");
                    res.render("adminAjoutAdmin/index", {title: "administrateur"})
                }
                else if(inputPassword == "admin2024_xx"){
                    res.render("admin/index", {title: "administrateur"})
                    console.log("Administrateur connecté !");
                }
                else{
                    console.log("Utilisateur non trouvé dans la table Admin!");
                    
                }
            })
            .catch(error=>{
                console.log("Connexion echoué:" + error);
                res.send("Connexion echoué veuillez rééssayer")
                res.render('connexion/index', {title: 'Connexion'})
            })


            //pour verifier si on est dans une table
            if (user){
                console.log("Nous sommes dans la table !");
            }
            else if(admin){
                console.log("Nous sommes dans la table !");
            }
            else{
                console.log("Nous sommes dans aucune table veuillez rééssayer !");
            }
})






//PAGE D'INSCRIPTION
router.get("/inscription", (req, res)=>{
    res.render('inscription/index', {title: 'Inscription'})
})

//PAGE QUI RECOIT LES INPUT DANS LA PAGE D'INSCRIPTION
router.post("/resto", (req, res)=>{

    //les coordonnées rentrées
    var inputNom = req.body.nom;
    var inputPrenom = req.body.prenom;
    var inputEmail = req.body.email;
    const inputPassword = req.body.password
    var inputTelephone = req.body.telephone;

    


    //verifie en fonction du mot de passe si c'est un administrateur en fonction du mot de passe
    const motdepasse = "admin";

    if(inputPassword == motdepasse){
        res.render("admin/index", {title: "administrateur"})
    
        const newAdmin = Admin.build({
            nom: inputNom,
            prenom: inputPrenom,
            motDePasse: inputPassword
        })
        newAdmin.save()
            .then(()=>{
                console.log("Enregistrement réussi !");
            })
            .catch(error=>{
                console.error("Erreur lors de l'enregistrement: " + error);
                res.render("admin/index", {title: "administrateur"})
            })
    }
    //verifie en fonction du mot de passe si c'est différent de celui de l'administrateur alors il va dans la page client 
    else{ 
        const nameUser = inputNom
        const lastNameUser = inputPrenom
        const emailUser = inputEmail
        const telephoneUser = inputTelephone
        res.render("clt/index", {title: "client", name: nameUser, lastName: lastNameUser, email: emailUser, tel: telephoneUser})
    
    const newUser = User.build({
        nom: inputNom,
        prenom: inputPrenom,
        email: inputEmail,
        motDePasse: inputPassword,
        telephone: inputTelephone
    })
    newUser.save()
        .then(()=>{
            console.log("Enregistrement réussi !");
        })
        .catch(error=>{
            console.error("Erreur lors de l'enregistrement: " + error);
            res.render("clt/index", {title: "client", name: inputNom, lastName: inputPrenom})
        })
    }
})


//COMMANDE

router.get("/resto", (req, res)=>{

    

    inputNom = req.query.nom
    inputPrenom = req.query.prenom
    inputEmail = req.query.email
    inputMenu = req.query.menu
    inputPrix = req.query.prix
    inputTelephone = req.query.telephone


    const nameUser = inputNom
    const lastNameUser = inputPrenom
    const emailUser = inputEmail
    const telephoneUser = inputTelephone
    res.render("clt/index", {title: "client", name: nameUser, lastName: lastNameUser, email: emailUser,tel: telephoneUser})


    const newCommande = Commande.build({
        nom: inputNom,
        prenom: inputPrenom,
        email: inputEmail,
        telephone: inputTelephone,
        menu: inputMenu,
        prix: inputPrix
    })
    newCommande.save()
        .then(()=>{ 
            console.log("Commande réussi !");
        })
        .catch(error=>{
            console.error("Erreur lors de l'enregistrement de la commande: " + error);
            res.render("clt/index", {title: "client"})
        })
    
 


    const menuCommande = req.query.menu
        

    const commandeSupp = Commande.destroy({where: {menu: menuCommande}})
            .then(() =>{
                console.log("Commande supprimée avec succès!")
            })
            .catch(error=>{
                console.error("Erreur lors de la suppression de la commande: " + error)
                res.send("Erreur lors de la suppression de la commande")
            }) 

    
})




//PANIER DU CLIENT
router.get("/resto/panier", async(req, res)=>{
    try{
        const commandes = await Commande.findAll()
        res.render('panier/index', {title: 'Panier', commandes: commandes})
        console.log("Commandes récupérées avec succès!")
        
    }
    catch(error){
        console.error("Erreur lors de la récupération des commandes: " + error)
        res.send("Erreur lors de la récupération des commandes")
    }

    
})




//PAGE DES COMMANDES RECUES 
router.get("/admin/commandes", async(req, res)=>{
    try{
        const commandeAdmin = await CommandeAdmin.findAll()
        res.render('commandes/index', {title: 'CommandeAdmin', commandeAdmin: commandeAdmin})
        console.log("Commandes récupérées avec succès!")
        
    }
    catch(error){
        console.error("Erreur lors de la récupération des commandes: " + error)
        res.send("Erreur lors de la récupération des commandes")
    }

})


//Route pour envoyer les commandes chez l’administrateur
router.get("/client/commandes", (req, res)=>{
        
    inputNom = req.query.nom
    inputPrenom = req.query.prenom
    inputEmail = req.query.email
    inputMenu = req.query.menu
    inputPrix = req.query.prix
    inputTelephone = req.query.telephone




const newCommande = CommandeAdmin.build({
        nom: inputNom,
        prenom: inputPrenom,
        email: inputEmail,
        telephone: inputTelephone,
        menu: inputMenu,
        prix: inputPrix
    })
    newCommande.save()
        .then(()=>{
            console.log("Commande réussi !");
            res.render("clt/index", {title: "client", name: inputNom, lastName: inputPrenom, email: inputEmail,tel: inputTelephone})

        })
        .catch(error=>{
            console.error("Erreur lors de l'enregistrement de la commande: " + error);
            res.render("clt/index", {title: "client"})
        })


        const menuCommande = req.query.menu
        

        const commandeSupp = Commande.destroy({where: {menu: menuCommande}})
                .then(() =>{
                    console.log("Commande supprimée avec succès!")
                })
                .catch(error=>{
                    console.error("Erreur lors de la suppression de la commande: " + error)
                    res.send("Erreur lors de la suppression de la commande")
                }) 

})


//AJOUTER UN ADMINISTRATEUR
router.get("/admin/ajout", (req, res)=>{
    res.render("adminAjout/index", {title: "Administrateur"})
})
router.post("/admin/ajout/resto", (req,res)=>{


    

    const inputNom = req.body.nom;
    const inputPrenom = req.body.prenom;
    const inputMail = req.body.email;
    const inputPassword = req.body.password





    const newAdmin = Admin.build({
        nom: inputNom,
        prenom: inputPrenom,
        email: inputMail,
        motDePasse: inputPassword
    })
    newAdmin.save()
        .then(()=>{
            console.log("Enregistrement réussi !");
            res.render("adminAjoutAdmin/index", {title: "administrateur"})
        })
        .catch(error=>{
            console.error("Erreur lors de l'enregistrement: " + error);
            res.send("Erreur lors de la creation d'un nouvel administrateur !")
        })
})

router.get("/admin/supp", (req, res)=>{

    res.render("adminSupp/index", {title: "suppression administrateur"})


})


//Route pour supprimer un administrateur
router.post("/admin", (req, res)=>{


    const inputNom= req.body.nom
    const inputPrenom= req.body.prenom
    const inputEmail= req.body.email

    const adminSupp = Admin.destroy({where: {nom: inputNom, prenom: inputPrenom, email: inputEmail}})
    .then(() =>{
        console.log("Administrateur supprimée avec succès!")
        res.render("admin/index", {title: "administrateur"})
        
    })
    .catch(error=>{
        console.error("Erreur lors de la suppression de l'administrateur: " + error)
        res.send("Erreur lors de la suppression de l'administrateur !")
    }) 


})



//Envoi et reception d’email

// Route pour traiter le formulaire de panier
router.post('/resto/panier', async (req, res) => {
    const { menu, prix, telephone, email } = req.body;
    const msg = {
        to: email,
        from: 'emresto.dev@gmail.com',
        subject: 'Confirmation de votre commande',
        text: `Bonjour,

        Merci pour votre commande !
        Menu: ${menu}
        Prix: ${prix}
        Téléphone: ${telephone}

        Nous vous contacterons bientôt pour plus de détails.

        Cordialement,
        Votre équipe`,
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #4CAF50;
            font-size: 24px;
            margin-bottom: 20px;
        }
        p {
            line-height: 1.6;
            margin-bottom: 10px;
            color: black;
        }
        .highlight {
            color: #4CAF50;
            font-weight: bold;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Confirmation de votre commande</h1>
        <p>Bonjour,</p>
        <p>Merci pour votre commande !</p>
        <p><span class="highlight">Menu:</span> ${menu}</p>
        <p><span class="highlight">Prix:</span> ${prix}</p>
        <p><span class="highlight">Téléphone:</span> ${telephone}</p>
        <p>Nous vous contacterons bientôt pour plus de détails.</p>
        <p class="footer">Cordialement,<br>Votre resto, <br> EM-RESTO</p>
    </div>
</body>
</html>
`
    };

    try {
        await sgMail.send(msg);
        console.log('E-mail envoyé avec succès !');

        await CommandeAdmin.destroy({ where: { email, telephone, menu } });
        console.log("Commande supprimée avec succès!");

        res.render("admin/index", { title: "administrateur" });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error.response ? error.response.body : error);
        res.send('Erreur lors de l\'envoi de la confirmation par e-mail.');
    }
});


module.exports = router
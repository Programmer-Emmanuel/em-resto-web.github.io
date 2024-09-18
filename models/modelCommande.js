const {Sequelize, DataTypes} = require("sequelize");



const sequelize = new Sequelize(
    "restaurant",//nom de la base de données
    "root", //nom de l’utilisateur
    "", //mot de passe de la base de données
    {
        host: 'localhost',
        dialect: "mariadb",
        dialectOptions: {
            timezone: "Etc/GMT-2"
        },
        logging: false
    }
)

//pour vérifier la connexion à la base de données
sequelize.authenticate()
    .then(_=> console.log("La connexion à la base de donnée a été établie !"))
    .catch(error=> console.error("Connexion échoué: " + error))







 //Créatiion de la table Comamande
const Commande = sequelize.define('Commande', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    prenom:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nom:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    menu:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    prix:{
        type: DataTypes.STRING,
        allowNull: false
    }
})
    //pour vérifier la  création de la table
sequelize.sync({force: true})
    .then(()=>{
        console.log("La table Commandes a été créée!")
    })
    .catch(error=>{
        console.error("Erreur lors de la création de la table: " + error)
    })





module.exports = Commande; 

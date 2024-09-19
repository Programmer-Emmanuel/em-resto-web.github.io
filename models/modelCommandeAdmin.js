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







 //Création de la table Comamande des commandes qui vont chez l’admin 
const CommandeAdmin = sequelize.define('CommandeAdmin', {
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
    },
    createAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
})

//pour vérifier la  création de la table
sequelize.sync({force: false}) 
    .then(()=>{
        console.log("La table CommandeAdmin a été créée!")
    })
    .catch(error=>{
        console.error("Erreur lors de la création de la table: " + error)
    })





module.exports = CommandeAdmin; 

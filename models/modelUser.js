const {Sequelize, DataTypes} = require("sequelize");



const sequelize = new Sequelize(
    "bdd resto",
    "root",
    "",
    {
        host: 'localhost',
        dialect: "mariadb",
        dialectOptions: {
            timezone: "Etc/GMT-2"
        },
        logging: false
    }
)

sequelize.authenticate()
    .then(_=> console.log("La connexion à la base de donnée a été établie !"))
    .catch(error=> console.error("Connexion échoué: " + error))








const User = sequelize.define('Utilisateur', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom:{
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    motDePasse:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

sequelize.sync({force: true})
    .then(()=>{
        console.log("La table User a été créée!")
    })
    .catch(error=>{
        console.error("Erreur lors de la création de la table: " + error)
    })





module.exports = User; 

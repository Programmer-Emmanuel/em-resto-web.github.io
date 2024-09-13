const {Sequelize, DataTypes} = require("sequelize");



const sequelize = new Sequelize(
    "restaurant",
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
    }
})

sequelize.sync({force: true})
    .then(()=>{
        console.log("La table CommandeAdmin a été créée!")
    })
    .catch(error=>{
        console.error("Erreur lors de la création de la table: " + error)
    })





module.exports = CommandeAdmin; 

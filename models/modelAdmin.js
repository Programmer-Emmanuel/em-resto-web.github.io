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

    const Admin = sequelize.define('Administrateur', {
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
            allowNull: false,
            unique: true
        }
    })
    
    sequelize.sync({force: true})
        .then(()=>{
            console.log("La table Admin a été créée!")
        })
        .catch(error=>{
            console.error("Erreur lors de la création de la table: " + error)
        })

        
module.exports = Admin; 
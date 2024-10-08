const {Sequelize, DataTypes} = require("sequelize");



const sequelize = new Sequelize(
    "restaurant", //nom de la base de données
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

    //Créatiion de la table Administrateur
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
    //pour vérifier la  création de la table
    sequelize.sync({force: false})
        .then(()=>{
            console.log("La table Admin a été créée!")
        })
        .catch(error=>{
            console.error("Erreur lors de la création de la table: " + error)
        })

        
module.exports = Admin; 
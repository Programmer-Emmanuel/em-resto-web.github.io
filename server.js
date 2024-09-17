const express = require("express")
const router = require("./routers/router")
const app = express()
const port = 3000;


//INDIQUER LE MOTEUR DE TEMPLATE EJS
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))


//Pour affichier les routes dans la console
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
})

//Pour que les fichiers ejs se charge depuis le dossier views
app.use(express.static("views"))


//
app.use(express.urlencoded({extended: true}))


//Route principale
app.use("/", router)


//POUR EVITER QUE L'APP CRASH

app.use((req, res, next)=>{
    res.status(404).send(
        `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Page Not Found</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
            text-align: center;
        }

        .container {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h1 {
            font-size: 100px;
            margin: 0;
            color: #333;
        }

        p {
            font-size: 20px;
            margin: 10px 0;
            color: #666;
        }

        a {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>404</h1>
        <p>Oups ! La page que vous cherchez n'existe pas.</p>
    </div>
</body>
</html>
`
    )
})


//lancer le serveur
app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})
const express = require("express")
const router = require("./routers/router")
const app = express()
const port = process.env.PORT || 3000;


//INDIQUER LE MOTEUR DE TEMPLATE
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))


app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
})

app.use(express.static("views"))



app.use(express.urlencoded({extended: true}))



app.use("/", router)


//POUR EVITER QUE L'APP CRASH

app.use((req, res, next)=>{
    res.status(404).send("Désolé la page que vous cherchez est introuvable !")
})

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})

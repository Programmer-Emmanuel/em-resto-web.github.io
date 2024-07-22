const express = require("express")
const router = require("./routers/router")
const app = express()
const port = 3000


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



app.listen(port, ()=>{
    console.log(`http://localhost:3000`);
})
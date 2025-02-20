const express = require("express");
const cors = require("cors");
const PORT = 3000;
const {users} = require("./data") 

// Crear instancia del servidor
const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res)=>{
    res.json(users)
});

app.post("/login", (req, res)=>{
    const{username, password} = req.body;
    const user = users.find(
        (usr)=> usr.username == username && usr.password == password
    );
    if (user){
        res.status(200).json({token:
            `token-falso-${user.id}`});
    } else {
        res.status(401).json
        ({error:"Usuario no valido"});
    }
});


const validarToken = (req, res, next) => {

    //const {token} = req.body;
    const token = req.headers.authorization;

    if (token) {
        if (token.startsWith
            ("token-falso-"))
            next();
            res.status(403).json
            ({mesasage: "Acceso denegado por falta de token de autorización"});
    }else {
        res.status(403).json
        ({mesasage: "Acceso denegado por falta de token de autorización"})
    }
}

app.get("/saludo-protegido",
    validarToken,
    (req, res) => {
        res.json({message: "Saludo protegido"});
    })

app.listen(PORT, ()=>{
    console.log("Sevver rinning in https://localhost:"+PORT)
});





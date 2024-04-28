const {connection}  = require("./database/connection");
//Importar express para solicitudes http y crear el servidor 
const express = require("express");
const cors = require("cors");

//Inicializar app
console.log("Arrancando la App");

//Conectar a la base de datos
connection();

// Crear servidor NodeJS
const app = express();
const puerto = 3900;

//Configurar el cors
app.use(cors());

//Convertir body a objeto js
app.use(express.json()); // Recibir datos con content-type app/json
app.use(express.urlencoded({extended:true})); //Recoge datos que llega por form-urlencoded

//Rutas
const rutas_articulo = require("./routes/articulo")

//Cargando las rutas
app.use("/api", rutas_articulo)

//Routas prueba hardcodeadas
app.get("/probando", (req, res) =>{
    return res.status(200).send(
        `
        <h1>Creando la API REST</h1>
        `
    )
})

//Escuchar servidor
app.listen(puerto, () =>{
    console.log("Servidor corriendo en el puerto:"+puerto);
})
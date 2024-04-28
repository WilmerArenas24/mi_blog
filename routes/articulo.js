const   express = require("express");
const router = express.Router();

//Cargando el controlado de articulo
const ArticuloControlador = require("../controllers/articulo");
//Rutas de prueba
router.get("/ruta-de-prueba", ArticuloControlador.prueba);





module.exports = router;

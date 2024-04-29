const   express = require("express");
const router = express.Router();

//Cargando el controlado de articulo
const ArticuloControlador = require("../controllers/articulo");
//Rutas de prueba
router.get("/ruta-de-prueba", ArticuloControlador.prueba);
router.get("/curso", ArticuloControlador.curso);

//Ruta util
router.post("/crear", ArticuloControlador.crear);
router.get("/articulos/:ultimos?", ArticuloControlador.listar); //Con el signo de interrogación le indicamos que el parametro es opcional
router.get("/articulo/:id", ArticuloControlador.uno);
router.delete("/articulo/:id", ArticuloControlador.borrar);
router.put("/articulo/:id", ArticuloControlador.editar);





module.exports = router;

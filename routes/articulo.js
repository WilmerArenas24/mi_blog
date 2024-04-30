const   express = require("express");
const router = express.Router();
const multer = require("multer"); //Importando multer para subir los archivos

const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './imagenes/articulos')

    },

    filename: (req, file, cb) =>{
        cb(null, 'articulo' + Date.now() + file.originalname);
    }
})

const subidas = multer({storage:almacenamiento});

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
router.post("/subir-imagen/:id", [subidas.single("file0")], ArticuloControlador.subir);
router.get("/imagen/:fichero", ArticuloControlador.imagen);






module.exports = router;

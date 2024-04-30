//Importando la libreria de validator para hacer las validaciones
const fs = require("fs");
const { validarArticulo } = require("../helper/validar");
const Articulo = require("../models/Articulo");
const path = require("path");



const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una prueba"
    });
}

const curso = (req, res) => {
    return res.status(200).json([
        {
            curso: "Curso de react",
            autor: "Victor robles",
            url: "react.es"
        },
        {
            curso: "Curso de react",
            autor: "Victor robles",
            url: "react.es"
        },
    ]);
}

// Metodo para crear un nuevo articulo
const crear = async (req, res) => {
    // Recoger los parametros a guardar
    let parametros = req.body;

    //Validar los datos con la libreria "validator"
    try {
        validarArticulo(parametros);


    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        })
    }

    try {
        // Crear el objeto a guardar
        const nuevoArticulo = new Articulo(parametros);

        // Guardar el artículo en la base de datos usando async/await
        const articuloGuardado = await nuevoArticulo.save();

        return res.status(200).json({
            status: "Success",
            articulo: articuloGuardado,
            mensaje: "Articulo guardado"
        });
    } catch (error) {
        console.error("Error al guardar el artículo:", error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al guardar el artículo en la base de datos"
        });
    }
}

//Funcion par aconsuir el listado de articulso de la base de dsatos
//Funcion para consultar el listado de articulos de la base de datos
const listar = async (req, res) => {
    try {
        // Ejecutar la consulta de todos los artículos de forma asíncrona
        const articulos = await Articulo.find({})
            .sort({ fecha: -1 }) //Ordenando la lista por el más nuevo en creacion
            .exec();

        // Verificar si se encontraron artículos
        if (!articulos || articulos.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado artículos"
            });
        }

        // Enviar la respuesta con los artículos encontrados
        return res.status(200).json({
            status: "success",
            articulos
        });
    } catch (error) {
        // Manejar errores en caso de que ocurran durante la consulta
        console.error("Error al listar los artículos:", error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al listar los artículos de la base de datos"
        });
    }
}

// Método para obtener un solo artículo de mi blog
const uno = async (req, res) => {
    try {
        // Recoger un id de la URL
        let id = req.params.id;

        // Buscar un artículo de forma asíncrona
        const articulo = await Articulo.findById(id);

        // Si no se encuentra el artículo, devolver un error
        if (!articulo) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el artículo"
            });
        }

        // Devolver el resultado
        return res.status(200).json({
            status: "success",
            articulo
        });
    } catch (error) {
        // Manejar errores en caso de que ocurran durante la búsqueda
        console.error("Error al obtener el artículo:", error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener el artículo de la base de datos"
        });
    }
}

//Eliminar un artciulo por id
const borrar = async (req, res) => {

    let articuloId = req.params.id;

    const articulo = await Articulo.findOneAndDelete({ _id: articuloId });

    // Articulo.findOneAndDelete({_id: articulo_id}, (error, articulo_borrado) =>{

    if (!articulo) {
        // Devolver el resultado
        return res.status(500).json({
            status: "error",
            mensaje: "Error al borrar"
        });

    }

    // Devolver el resultado
    return res.status(200).json({
        status: "success",
        articulo: articulo,
        mensaje: "Articulo borrando"
    });
}


const editar = async (req, res) => {
    try {
        // Recoger el ID a editar
        let articuloId = req.params.id;

        // Recoger datos del body
        let parametros = req.body;

        //Validar parametros
        validarArticulo(parametros)


        // Buscar y actualizar
        const articuloActualizado = await Articulo.findByIdAndUpdate(articuloId, parametros, { new: true });

        if (!articuloActualizado) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al actualizar"
            });
        }

        // Devolver una respuesta
        return res.status(200).json({
            status: "success",
            articulo: articuloActualizado
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }
};

//Subir imagenes y ficheros con multer
const subir = async (req, res) => {

    //Configurar multer

    //Recoger el fichero subido
    if (!req.file && !req.files) {

        return res.status(404).json({
            status: "error",
            mensaje: "Petición invalida"
        })

    }


    //Nombre del archivo
    let archivo = req.file.originalname;

    //Extension de archivo
    let archivo_split = archivo.split("\.");
    let extension = archivo_split[1];


    //Comprobar extension correcta
    if (extension != "png" && extension != "jpg" &&
        extension != "jpeg" && extension != "gif") {

        //Borrar archivo y dar respuesta
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: "error",
                mensaje: "Extension invalida"
            })
        })
    }
    else {


        //Actualizar el articulo
        let articuloId = req.params.id;

        // Buscar y actualizar
        const articuloActualizado = await Articulo.findByIdAndUpdate(articuloId, {imagen: req.file.filename}, { new: true });

        if (!articuloActualizado) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al actualizar"
            });
        }



        // Devolver respuesta

        return res.status(200).json({
            status: "success",
            articulo: articuloActualizado,
            fichero: req.file
        })
    }
}

//Creando una ruta para utilizar la imagen 
const imagen = async (req,res) =>{
    let fichero = req.params.fichero;
    let ruta_fisica = "./imagenes/articulos/"+fichero;

    fs.stat(ruta_fisica, (error,  existe) =>{
        if(existe){
            return res.sendFile(path.resolve(ruta_fisica));
        }else{
            return res.status(400).json({
                status:"error",
                mensaje:"Imagen no existe",
                existe,
                fichero,
                ruta_fisica
            })
        }
    })
} 





module.exports = {
    prueba,
    curso,
    crear,
    listar,
    uno,
    borrar,
    editar,
    subir,
    imagen
}

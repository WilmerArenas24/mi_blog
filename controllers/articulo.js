//Importando la libreria de validator para hacer las validaciones
const validator = require("validator");
const Articulo = require("../models/Articulo");

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

    console.log(parametros)

    //Validar los datos con la libreria "validator"
    try {
        let validar_titulo = !validator.isEmpty(parametros.titulo);
        let validar_contenido = !validator.isEmpty(parametros.contenido);

        if (!validar_titulo || !validar_contenido) {
            throw new Error("Ingrese los datos completos")
        }

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
      const articulos = await Articulo.find({}).exec();

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





module.exports = {
    prueba,
    curso,
    crear,
    listar
}

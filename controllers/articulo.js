//Importando la libreria de validator para hacer las validaciones
const validator = require("validator");

const articulo = require("../models/Articulo");
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
    autor:"Victor robles",
    url:   "react.es" 
    },
    {
      curso: "Curso de react",
      autor:"Victor robles",
      url:   "react.es" 
      },
]);
}

// Metodo para crear un nuevo articulo
const crear = async (req,res)=>{

  // Recoger los parametros a guardar
  let parametros = req.body;

  console.log(parametros)
  
  //Validar los datos con la libreria "validator"
  try {

    let validar_titulo = !validator.isEmpty(parametros.titulo);
    let validar_contenido = !validator.isEmpty(parametros.contenido);

    if(!validar_titulo || !validar_contenido){
      throw new Error("Ingrese los datos completos")
    }

    
  } catch (error) {

      return res.status(400).json({
        status:"error",
        mensaje:"Faltan datos por enviar"
        
      })
    
  }

  //Crear el objeto a guardar
  const articulo = new Articulo(parametros);

  //Asignar valores a objeto basado en el modelo (manual o automatico)
  // articulo.titulo = parametros.titulo;

  //Guardar elarticulo en la base de datos
  await articulo.save((error, articuloGuardado) =>{

    if(error || !articuloGuardado){

      return res.status(400).json({
        status:"error",
        mensaje:"No se ha guardado el articulo"
        
      });
    }

        return res.status(200).json({
      estatus:"Success",
      articulo: articuloGuardado,
      mensaje: "Articulo guardado"
    })
  });
}


module.exports = {
    prueba,
    curso,
    crear
}
const validator = require("validator");

const validarArticulo = (parametros) =>{
    
        // Validar datos
        let validar_titulo = !validator.isEmpty(parametros.titulo);
        let validar_contenido = !validator.isEmpty(parametros.contenido);

        if (!validar_titulo || !validar_contenido) {
            throw new Error("Ingrese los datos completos");
        }
}

module.exports = {
    validarArticulo
}
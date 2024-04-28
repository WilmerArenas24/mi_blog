const prueba = (req, res) => {
      return res.status(200).json({
        mensaje: "Soy una prueba"

      });
}

module.exports = {
    prueba
}
const fs = require("fs");

function obtenerDatosParaPais(jsonData, nombrePais) {
  // Parsear el JSON
  const data = JSON.parse(jsonData);

  // Buscar el país en el JSON
  const paisEncontrado = data.find((pais) => pais.name === nombrePais);

  // Verificar si se encontró el país
  if (!paisEncontrado) {
    console.log(`No se encontró el país con el nombre ${nombrePais}`);
    return [];
  }

  // Crear el array de objetos con la información de departamentos y ciudades
  const resultado = [];

  paisEncontrado.states.forEach((departamento) => {
    departamento.cities.forEach((ciudad) => {
      resultado.push({
        department: departamento.name,
        lat: ciudad.latitude,
        long: ciudad.longitude,
        city: ciudad.name,
      });
    });
  });

  return resultado;
}

// Leer el JSON desde un archivo
fs.readFile("./countries+states+cities.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }

  const nombrePaisBuscar = "Brazil";
  const resultado = obtenerDatosParaPais(data, nombrePaisBuscar);

  // Escribir el resultado en un nuevo archivo JSON
  fs.writeFile(
    `${nombrePaisBuscar}.json`,
    JSON.stringify(resultado, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.error("Error al escribir el archivo de resultado:", err);
        return;
      }
      console.log("Resultado guardado en resultado.json");
    }
  );
});

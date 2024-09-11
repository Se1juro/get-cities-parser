const fs = require("fs");

// Función para quitar tildes de una cadena
function quitarTildes(cadena) {
  return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Función para eliminar un string específico de la propiedad 'department'
function eliminarString(jsonData, stringEliminar) {
  const data = JSON.parse(jsonData);
  data.forEach((item) => {
    item.department = quitarTildes(
      item.department.replace(new RegExp(stringEliminar, "i"), "").trim()
    );
    item.city = quitarTildes(item.city);
  });
  return data; // Devolver el objeto modificado
}

fs.readFile("./Brazil.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }
  const nombrePaisBuscar = "Brazil";
  // Llamada a la función para eliminar el string "Recursos" del 'department'
  const nuevoJsonData = eliminarString(data, "Province");

  fs.writeFile(
    `${nombrePaisBuscar}.json`,
    JSON.stringify(nuevoJsonData, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.error("Error al escribir el archivo:", err);
      } else {
        console.log("El nuevo archivo JSON ha sido creado correctamente.");
      }
    }
  );
});

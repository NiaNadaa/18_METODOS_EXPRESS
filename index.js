const express = require('express');
let app = express();

app.listen(process.env.PORT || 3000);
console.log('Servidor corriendo en puerto: 3000');

let personas = [
  { nombre: "Ana", apellido: "Fernandez", edad: 18 },
  { nombre: "Ivan", apellido: "Parra", edad: 22 },
  { nombre: "David", apellido: "Lazaro", edad: 21 }
];


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));


app.get("/personas", (req, res) => {
  res.send(personas);
});

app.post("/add-persona", (req, res) => {
  let persona = req.body.persona;
  personas.push(persona);

  res.send({ personas: personas });
});

app.put("/modificar-persona", (req, res) => {
  for (let i = 0; i < personas.length; i++) {

    if(req.body.persona.nombre === personas[i].nombre) {
      personas[i].apellido = req.body.persona.apellido;
      personas[i].edad = req.body.persona.edad;

      return res.send({ message: "Datos modificados correctamente" });
    }
  }
  return res.send({ message: "La persona solicitada no existe" });

});

app.delete("/borrar-persona", (req, res) => {
  for (let i = 0; i < personas.length; i++) {

    if(req.body.persona.nombre === personas[i].nombre) {
      personas.splice(i, 1);
      return res.send({ message: "Persona eliminada correctamente" });
    }
  }
  return res.send({ message: "La persona solicitada no existe" });

});

const express = require('express');
const path = require('path');
const app = express();


   const filePath = path.join(__dirname);
   app.use(express.static(filePath));
  

const port = 3000; // Puerto en el que el servidor escuchará las solicitudes

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
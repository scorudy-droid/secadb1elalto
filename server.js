const express = require('express');
const multer  = require('multer');
const path = require('path');
const app = express();

// Servir el archivo HTML desde la raíz (opcional pero muy útil)
app.use(express.static(__dirname));

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta destino
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Guarda el archivo con su nombre original
    }
});

const upload = multer({ storage: storage });

// Ruta POST que recibe el archivo enviado por el formulario HTML
app.post('/subir-archivo', upload.single('archivo'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Error: No se subió ningún archivo.');
    }
    res.send(`¡Éxito! El archivo "${req.file.originalname}" se subió al servidor correctamente.`);
});

// Arrancar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor listo en: http://localhost:${PORT}`);
});

const express = require('express');
const multer  = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();

// 1. Habilitar CORS para permitir peticiones desde tu servidor IIS
app.use(cors());

// 2. Configurar Multer para definir dónde y cómo se guardarán los archivos TXT
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Los archivos se guardarán en la carpeta llamada 'uploads'
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Mantiene el nombre original del archivo .txt
    }
});

const upload = multer({ storage: storage });

// 3. Ruta POST que recibe el archivo enviado desde tu formulario HTML
app.post('/subir-archivo', upload.single('archivo'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Error: No se recibió ningún archivo.');
    }
    // Respuesta de éxito que leerá tu HTML
    res.send(`¡Éxito! El archivo "${req.file.originalname}" se subió correctamente.`);
});

// 4. Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(` Servidor Node.js activo y escuchando peticiones`);
    console.log(` Dirección: http://127.0.0.1:${PORT}`);
    console.log(`==================================================`);
});

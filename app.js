import express from 'express';
import cors from 'cors';

const app = express();

// Configuración de CORS para permitir solicitudes desde http://localhost:4001
const corsOption = {
  origin: 'http://localhost:4001',
};
app.use(cors(corsOption));

app.use(express.json());

// Middleware para parsear cuerpos de solicitudes URL-encoded
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server abierto en http://localhost:${PORT}`));

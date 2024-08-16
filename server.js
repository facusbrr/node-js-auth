import express from 'express';
import cors from 'cors';
import { db } from './src/db/db.js';
import initial from './src/db/iniciarRoles.js';

const app = express();

// Configuración de CORS para permitir solicitudes desde http://localhost:4001
const corsOptions = {
  origin: 'http://localhost:4001',
};
app.use(cors(corsOptions));

app.use(express.json());

// Middleware para parsear cuerpos de solicitudes URL-encoded
app.use(express.urlencoded({ extended: true }));

// Ruta para probar
app.get('/', (req, res) => {
  res.json({ msg: 'Hola' });
});

const connectToDatabase = async () => {
  try {
    //Conecta a la base de datos MongoDB utilizando solo la URL de conexión.
    await db.mongoose.connect(db.url);
    console.log('Server conectado con MongoDB');
    await initial();

    // Solo iniciar el servidor después de una conexión exitosa a la base de datos
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(`Server abierto en http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('Conexión error', err);
    process.exit();
  }
};

connectToDatabase();

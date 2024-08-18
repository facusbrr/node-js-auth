import express from 'express';
import cors from 'cors';
import configureAuthRoutes from './src/routes/auth.routes.js'; // Importa tus rutas
import configureUserRoutes from './src/routes/user.routes.js';
import { db } from './src/db/db.js';
import { initial } from './src/db/iniciarRoles.js';

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:4001',
  allowedHeaders: ['x-access-token', 'Origin', 'Content-Type', 'Accept']
};
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar rutas
configureAuthRoutes(app);
configureUserRoutes(app);
// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Ocurrió un error en el servidor' });
});

const connectDB = async () => {
  try {
    await db.mongoose.connect(db.url);
    console.log('Server conectado con MongoDB');
    await initial();

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(`Server abierto en http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('Conexión error', err);
    process.exit();
  }
};

connectDB();
//El cerebro principal
import 'dotenv/config';
import express from 'express';
import cors from 'cors';    
import 'express-async-errors'
import morgan from 'morgan';
import { logerMiddleware } from './presentation/middlewares/loger.middleware.js';
import noteRoutes from './presentation/routes/note.routes.js';
import { connectMongo } from './infrastructure/database/mongo/connection.js';
import { connectMysql } from './infrastructure/database/mysql/connection.js';
//estos son librerias

// 1. Conecta la base de datos
await connectMongo();
//await connectMysql();

// 2. Crea la app
const app = express();

app.use(cors()); // 3. Permite peticiones de otros dominios (frontend)
app.use(express.json()); // 4. Permite leer JSON del body
app.use(logerMiddleware); // 5. Activa el logger en TODAS las rutas
app.use(morgan('dev'));  // 6. Logger más detallado (librería externa)


app.use('/uploads', express.static('uploads')); // 7. Sirve imágenes como archivos estáticos
app.use('/api/v1/notes',noteRoutes); // 8. Conecta las rutas de notas
 
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK',message: 'API de notas activa' });
});


//midleware de manejo de errores global 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
//El cerebro principal
import 'dotenv/config';
import express from 'express';
import cors from 'cors';    
import 'express-async-errors'
import morgan from 'morgan';
import { loggerMiddleware } from './presentation/middlewares/loger.middleware.js';
import noteRoutes from './presentation/routes/note.routes.js';
import authRoutes from './presentation/routes/auth.routes.js';
import { connectMongo } from './infrastructure/database/mongo/connection.js';
import { connectMysql } from './infrastructure/database/mysql/connection.js';
import { setupSwagger } from './infrastructure/config/swagger.config.js';
//estos son librerias


// 1. Conecta la base de datos
await connectMongo();
await connectMysql();



// 2. Crea la app
const app = express();


app.use(cors()); //Permite peticiones de otros dominios (frontend)
app.use(express.json()); //Permite leer JSON del body
setupSwagger(app); //Configuramos Swagger para la documentación de la API
app.use(morgan('dev'));  //Logger más detallado (librería externa)
app.use(loggerMiddleware); //Activa el logger en TODAS las rutas



// uso de imagenes estaticas
app.use('/uploads', express.static('uploads')); //Sirve imágenes como archivos estáticos
app.use('/api/v1/auth', authRoutes);//Conecta las rutas de autenticación
app.use('/api/v1/notes',noteRoutes); //Conecta las rutas de notas
 

// primer endpoint de tipo GET
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK',message: 'API de notas activa' });
});

//midleware de manejo de errores global 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});
 

// iniciando servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app;
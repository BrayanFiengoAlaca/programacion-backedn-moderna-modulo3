//Son funciones que se ejecutan antes de llegar al controller. Interceptan cada petición.
export const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] metodo: ${req.method} | Ruta: ${req.url}`); 
    //`[2025-01-01] metodo: POST | Ruta: /api/v1/notes`
    next();
};
//Define qué URL lleva a qué controller. 
//Y aquí está algo muy importante — la inyección de dependencias:
import { Router } from "express";
import NoteController from "../controllers/note.controller.js";
import NoteService from "../../application/use-cases/note.service.js";
// Aqui definiremos que base de datos usar para las notas, en este caso MongoDB, pero luego se puede cambiar a MySQL, 
// o incluso usar ambas, dependiendo de la necesidad de cada endpoint. Para esto, 
// se puede crear un servicio que se encargue de decidir que repositorio usar, y luego inyectar ese servicio en el controlador. 
// De esta manera, el controlador no tiene que preocuparse por la base de datos, y se puede cambiar facilmente sin afectar el resto del codigo.
import  upload  from "../middlewares/upload.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
 
// AQUÍ decides qué base de datos usar, solo cambiando una línea:
import NoteMongoRepository from "../../infrastructure/database/mongo/note.mongo.repository.js"; // ← Mongo activo
import NoteMysqlRepository from "../../infrastructure/database/mysql/note.mysql.repository.js"; // ← MySQL comentado
 
// inyeccion de dependencias
const noteRepository = new NoteMongoRepository();
//const noteRepository = new NoteMysqlRepository();
 
// Luego todo se encadena:
const noteService = new NoteService(noteRepository); // el servicio recibe el repositorio
const noteController = new NoteController(noteService); // el controller recibe el servicio
 
const router = Router();
 
//definir las rutas para las notas
//comentando sin seguridad  
//router.post("/", upload.single('image'), noteController.createNote);
//router.get("/", noteController.getNotesByUserId);

router.post("/", authMiddleware, upload.single('image'), noteController.createNote); // solo usuarios autenticados pueden crear notas
router.get("/", authMiddleware, noteController.getNotesByUserId); // solo usuarios autenticados pueden ver sus notas
router.get("/:id", authMiddleware, noteController.getNoteById); // solo usuarios autenticados pueden ver una nota por su id
router.put("/:id", authMiddleware, upload.single('image'), noteController.updateNote); // solo usuarios autenticados pueden actualizar una nota por su id   
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), noteController.deleteNote); // solo usuarios autenticados con rol admin pueden eliminar una nota por su id
router.post("/:id/share", authMiddleware, noteController.shareNote); // solo usuarios autenticados pueden compartir una nota por su id, y se le pasará el id del usuario con quien se quiere compartir la nota en el body de la petición




export default router;
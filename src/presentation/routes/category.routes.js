//Tarea 1 (Paso 6)
//Es quien conecta las URLs con el controller, y también inyecta todas las dependencias juntas
import { Router } from "express";
import CategoryController from "../controllers/category.controller.js";
import CategoryService from "../../application/use-cases/category.service.js";
import CategoryMongoRepository from "../../infrastructure/database/mongo/category.mongo.repository.js";
import CategoryMysqlRepository from "../../infrastructure/database/mysql/category.mysql.repository.js"; // ← MySQL comentado
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Inyección de dependencias
//const categoryRepository = new CategoryMongoRepository();
const categoryRepository = new CategoryMysqlRepository(); // ← MySQL comentado
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

const router = Router();

// Todas las rutas requieren token JWT
router.post("/", authMiddleware, categoryController.createCategory);
router.get("/", authMiddleware, categoryController.getCategoriesByUserId);
router.get("/:id", authMiddleware, categoryController.getCategoryById);
router.put("/:id", authMiddleware, categoryController.updateCategory);
router.delete("/:id", authMiddleware, categoryController.deleteCategory);

export default router;
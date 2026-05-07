//Tarea 1 (Paso 4)
//Aqui toma las decisiones, por ejemplo validar que el nombre sea obligatorio, o que solo el dueño pueda eliminar su categoría. Eso es el Service.
import CategoryEntity from "../../domain/entities/category.entity.js";

export default class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // 1. Crear una categoría
    async createCategory(data) {
        if (!data.name) throw new Error("Name is required");
        const category = new CategoryEntity(data);
        return await this.categoryRepository.save(category);
    }

    // 2. Obtener todas las categorías de un usuario
    async getCategoriesByUserId(userId) {
        return await this.categoryRepository.findByUserId(userId);
    }

    // 3. Obtener una categoría por su ID
    async getCategoryById(id) {
        const category = await this.categoryRepository.findById(id);
        if (!category) throw new Error("Category not found");
        return category;
    }

    // 4. Actualizar una categoría
    async updateCategory(id, data, currentUserId) {
        const existing = await this.categoryRepository.findById(id);
        if (!existing) throw new Error("Category not found");
        if (existing.userId !== currentUserId) {
            throw new Error("Unauthorized: You can only update your own categories");//No autorizado: Solo puedes actualizar tus propias categorías.
        }
        return await this.categoryRepository.update(id, data);
    }

    // 5. Eliminar una categoría
    async deleteCategory(id, currentUserId) {
        const existing = await this.categoryRepository.findById(id);
        if (!existing) throw new Error("Category not found");
        if (existing.userId !== currentUserId) {
            throw new Error("Unauthorized: You can only delete your own categories");//No autorizado: Solo puedes eliminar tus propias categorías.
        }
        await this.categoryRepository.delete(id);
        return { message: "Category deleted successfully" }; 
    }
}
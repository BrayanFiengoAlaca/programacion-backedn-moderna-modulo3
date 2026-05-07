//Tarea 1 (Paso 3)
//El puente entre el código y MongoDB, es decir, quien realmente hace las operaciones de guardar, buscar, actualizar y eliminar en la base de datos.
import CategoryModel from "./category.model.js";

export default class CategoryMongoRepository {
    
    // Guarda una categoría
    async save(categoryEntity) {
        const category = new CategoryModel({
            name: categoryEntity.name,
            description: categoryEntity.description,
            userId: categoryEntity.userId,
        });
        const saved = await category.save();
        return saved.toObject();
    }

    // Busca todas las categorías de un usuario
    async findByUserId(userId) {
        return await CategoryModel.find({ userId });
    }

    // Busca una categoría por su ID
    async findById(id) {
        const category = await CategoryModel.findById(id);
        return category ? category.toObject() : null;
    }

    // Actualiza una categoría por su ID
    async update(id, data) {
        const updated = await CategoryModel.findByIdAndUpdate(id, data, { new: true });
        if (!updated) throw new Error("Category not found");
        return updated.toObject();
    }

    // Elimina una categoría por su ID
    async delete(id) {
        const deleted = await CategoryModel.findByIdAndDelete(id);
        return deleted ? true : null;
    }
}
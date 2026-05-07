//Tarea 1 (Paso 3)
//El puente entre el código y MongoDB, es decir, quien realmente hace las operaciones de guardar, buscar, actualizar y eliminar en la base de datos.
import CategoryModel from "./category.model.js";

export default class CategoryMySQLRepository {

    async save(categoryEntity) {
        const category = await CategoryModel.create({
            name: categoryEntity.name,
            description: categoryEntity.description,
            userId: categoryEntity.userId,
        });
        return category.toJSON();
    }

    async findByUserId(userId) {
        return await CategoryModel.findAll({ where: { userId } });
    }

    async findById(id) {
        const category = await CategoryModel.findByPk(id);
        if (!category) throw new Error("Category not found");
        return category.toJSON();
    }

    async update(id, data) {
        const category = await CategoryModel.findByPk(id);
        if (!category) throw new Error("Category not found");
        await category.update(data);
        return category.toJSON();
    }

    async delete(id) {
        const category = await CategoryModel.findByPk(id);
        if (!category) throw new Error("Category not found");
        await category.destroy();
        return { message: "Category deleted successfully" };
    }
}
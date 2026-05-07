import  NoteModel  from "./note.model.js";

//Es el puente entre tu lógica y la base de datos. Solo sabe hacer dos cosas:
//guardar una nota y buscar notas por el id del usuario. No tiene lógica de negocio, solo se encarga de interactuar con la base de datos. 
//Es decir, es el encargado de traducir las operaciones que quieres hacer en tu aplicación a consultas SQL que se ejecutan en la base de datos.

export default class NoteMySQLRepository {
    //guarda la nota
    async save(noteEntity) { 
        // Se llama al metodo create de sequelize, y se le pasan los parametros necesarios para crear un objeto, y se retorna el resultado
        const note = await NoteModel.create({
            title: noteEntity.title,
            content: noteEntity.content,
            imageUrl: noteEntity.imageUrl,
            isPrivate: noteEntity.isPrivate,
            password: noteEntity.password,
            userId: noteEntity.userId,
            categoryId: noteEntity.categoryId, //tarea 2 (Paso 3)
        });
        // Se llama al metodo toJSON de sequelize, para convertir el objeto note a un objeto plano, y se retorna el resultado
        return note.toJSON();
    }

    //busca todas las notas que pertenecen a un usuario
    async findByUserId(userId) {
        return await NoteModel.findAll({ where: { userId } });
    }

    //Buscar por ID
    async findById(id) {
        const note = await NoteModel.findByPk(id); // PK = primary key
        if (!note) throw new Error("Note not found");
        return note.toJSON();
    }

    //Actualizar
    async update(id, data) {
        const note = await NoteModel.findByPk(id);
        if (!note) throw new Error("Note not found");
        await note.update(data);
        return note.toJSON();
    }

    //Eliminar
    async delete(id) {
        const note = await NoteModel.findByPk(id);
        if (!note) throw new Error("Note not found");
        await note.destroy();
        return { message: "Note deleted successfully" };
    }
}
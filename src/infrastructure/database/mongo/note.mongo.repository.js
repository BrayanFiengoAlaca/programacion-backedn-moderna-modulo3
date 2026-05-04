import NoteModel from "./note.model.js";

//Es el puente entre tu lógica y la base de datos. Solo sabe hacer dos cosas:

export default class NoteMongoRepository {
    //guarda una nota
    async save(noteEntity){
        // Se instancia un nuevo objeto de la clase NoteModel, y se le pasan los parametros necesarios para crear un objeto
        // Se asignan las propiedades del objeto noteEntity a las propiedades del objeto note, para que se guarde en la base de datos
        const note = new NoteModel({
            title: noteEntity.title,
            content: noteEntity.content,
            imageUrl: noteEntity.imageUrl,
            isPrivate: noteEntity.isPrivate,
            password: noteEntity.password,
            userId: noteEntity.userId
        });
        // Se llama al metodo save de mongoose
        const savedNote = await note.save();
        return savedNote.toObject();
    }
    //busca todas las notas que pertenecen a un usuario
    async findByUserId(userId){
        return await NoteModel.find({ userId });
    }

    //busca una nota por su id
    async findById(id) {
        const note = await NoteModel.findById(id);
        return note ? note.toObject() : null;
    }

    //actualiza una nota por su id
    async update(id, data) {
        const updatedNote = await NoteModel.findByIdAndUpdate(
            id, data, 
            { new: true, } // retorna la nota ya actualizada
        );
        if (!updatedNote) throw new Error("Note not found"); //nota no encontrada
        return updatedNote.toObject();
    } 

    //elimina una nota por su id
    async delete(id) {
        const deletedNote = await NoteModel.findByIdAndDelete(id);
        return deletedNote ? true : null;
    }
}
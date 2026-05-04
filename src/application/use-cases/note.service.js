import NoteEntity from "../../domain/entities/note.entity.js";

//Contiene las acciones que puede hacer el usuario con las notas. En este caso tiene dos:

export default class NoteService {
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
    }
    
    //1.Crear una nota
    async createNote(data) {
        if (!data.title || !data.content) { throw new Error("Title and content are required"); }
 
        const note = new NoteEntity(data); //usa el molde de la nota para crear una nueva nota con los datos recibidos
        return await this.noteRepository.save(note); //usa el repositorio para guardar la nota en la base de datos
    }
    
    //2.Obtener notas por usuario
    async getNoteByUser(userId){
        return await this.noteRepository.findByUserId(userId);
    }

    //Buscar por ID
    async getNoteById(id) {
        return await this.noteRepository.findById(id);
    }

    //Actualizar
    async updateNote(id, data) {
        if (!data.title || !data.content) throw new Error("Title and content are required");
        return await this.noteRepository.update(id, data);
    }

    //Eliminar
    async deleteNote(id) {
        return await this.noteRepository.delete(id);
    }
}
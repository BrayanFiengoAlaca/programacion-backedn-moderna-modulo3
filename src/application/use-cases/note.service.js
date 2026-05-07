import NoteEntity from "../../domain/entities/note.entity.js";

//Contiene las acciones que puede hacer el usuario con las notas. En este caso tiene dos:
//logica de negocio para crear una nota y obtener las notas de un usuario. 

export default class NoteService {
    constructor(noteRepository, mailService) {
        this.noteRepository = noteRepository;
        this.mailService = mailService;
    }
    
    //1.Crear una nota
    async createNote(data) {
        if (!data.title || !data.content) { throw new Error("Title and content are required"); }
 
        const note = new NoteEntity(data); //usa el molde de la nota para crear una nueva nota con los datos recibidos
        return await this.noteRepository.save(note); //usa el repositorio para guardar la nota en la base de datos
    }
    
    // 2.Obtener una nota por su ID
    async getNoteById(id){
    const note = await this.noteRepository.findById(id); //usa el repositorio para buscar la nota por su ID
    if (!note) throw new Error("Note not found"); // si no encuentra la nota, lanza un error
    return note;
    }

    // 3.Obtener todas las notas de un usuario por su ID
    async getNotesByUserId(userId) {
    return await this.noteRepository.findByUserId(userId); //usa el repositorio para buscar todas las notas que pertenecen a un usuario por su ID
    }

    // 4.Actualizar una nota por su ID
    async updateNote(id, data, currentUserId) { 
        const existingNote = await this.noteRepository.findById(id); //usa el repositorio para buscar la nota por su ID
        if (!existingNote) throw new Error("Note not found"); // si no encuentra la nota, lanza un error

        // RESTRICCIÓN: Solo el dueño puede actualizarla
        if (existingNote.userId !== currentUserId) {
        throw new Error("Unauthorized: You can only update your own notes");// si el usuario que intenta actualizar la nota no es el dueño, lanza un error de autorización
        }

        const note = await this.noteRepository.update(id, data); //usa el repositorio para actualizar la nota con los nuevos datos recibidos
        if (!note) throw new Error("Note not found"); // si no encuentra la nota después de intentar actualizarla, lanza un error
        return note;
    }

    
    // 5.Eliminar una nota por su ID
    async deleteNote(id, currentUserId) {
        const existingNote = await this.noteRepository.findById(id);
        if (!existingNote) throw new Error("Note not found");

        // RESTRICCIÓN: Solo el dueño puede eliminarla
        if (existingNote.userId !== currentUserId) {
            throw new Error("Unauthorized: You can only delete your own notes");
        }

        const note = await this.noteRepository.delete(id);
        if (!note) throw new Error("Note not found");
        return { message: "Note deleted successfully" };
    } 


    // 6.Compartir una nota por email
    async shareNoteByEmail(noteId, targetEmail, currentUserId) {
        const note = await this.noteRepository.findById(noteId);
        if (!note) throw new Error("Note not found");

        // RESTRICCIÓN: Solo el dueño puede compartirla
        if (note.userId !== currentUserId) {
            throw new Error("Unauthorized: You can only share your own notes");
        }
        return await this.mailService.sendNoteEmail(targetEmail, note);
    }


}
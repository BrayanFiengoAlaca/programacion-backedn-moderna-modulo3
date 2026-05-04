//Recibe la petición, la prepara, llama al servicio, y devuelve la respuesta. 
//El controller no sabe nada de base de datos ni lógica — solo sabe recibir y responder. 
//Es como un recepcionista que te atiende y llama al técnico.
export default class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }
    
    //Recibe la petición, la prepara, llama al servicio, y devuelve la respuesta.
    createNote = async (req, res) => {
        const data = req.body; // 1. Agarra los datos del request
        if (req.file) data.imageUrl = '/uploads/' + req.file.filename; // 2. Si hay imagen, agrega la ruta
        data.userId = 'user_123';  // 3. todo esto vendrá del token JWT
        try {
            const note = await this.noteService.createNote(data); // 4. Le pasa el trabajo al servicio
            res.status(201).json(note); // 5. Devuelve la respuesta al cliente
        } catch (error) {
            res.status(400).json({ error: error.message });
        }   
    }
    
    //Recibe la petición, la prepara, llama al servicio, y devuelve la respuesta.
    getNotesByUserId = async (req, res) => {
        const userId = 'user_123';
        try {
            const notes = await this.noteService.getNotesByUserId(userId);
            res.status(200).json(notes); // 200 OK
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    //Buscar por ID
    getNoteById = async (req, res) => {
        const { id } = req.params; // viene de la URL: /api/v1/notes/123
        try {
            const note = await this.noteService.getNoteById(id);
            res.status(200).json(note);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    //Actualizar
    updateNote = async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        try {
            const note = await this.noteService.updateNote(id, data);
            res.status(200).json(note);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    //Eliminar
    deleteNote = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.noteService.deleteNote(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}
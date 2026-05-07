//Es el molde/plantilla de lo que es una nota. Básicamente dice: 
//"Una nota SIEMPRE debe tener título, contenido, userId... y opcionalmente imagen o contraseña".
//Es como el formulario en blanco que defines antes de llenarlo.
//Molde para tu código JSON
//Tarea 2 (Paso 1)

export default class NoteEntity {
    constructor ({ id, title, content, imageUrl, isPrivate, password,userId, categoryId }) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl || null;
        this.isPrivate = isPrivate || false;
        this.password = password || null;
        this.userId = userId;
        this.categoryId = categoryId || null;
    }
 
}
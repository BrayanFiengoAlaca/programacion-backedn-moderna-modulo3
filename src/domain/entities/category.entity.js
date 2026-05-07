//TAREA 1 (PASO 1) define QUÉ es una categoría (el molde)
export default class CategoryEntity {
    constructor({ id, name, description, userId }) {
        this.id = id;
        this.name = name;
        this.description = description || null;
        this.userId = userId;
    }
}
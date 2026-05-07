//Tarea 1 (Paso 5)
//Aqui se recibe la petición de Postman y devuelve la respuesta
//Recibe la petición, llama al service, y devuelve la respuesta

// Recibe la petición, llama al service, y devuelve la respuesta
export default class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }

    createCategory = async (req, res) => {
        const data = req.body;
        data.userId = req.user.id;
        try {
            const category = await this.categoryService.createCategory(data);
            res.status(201).json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getCategoriesByUserId = async (req, res) => {
        const userId = req.user.id;
        try {
            const categories = await this.categoryService.getCategoriesByUserId(userId);
            res.status(200).json(categories);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    };

    getCategoryById = async (req, res) => {
        const { id } = req.params;
        try {
            const category = await this.categoryService.getCategoryById(id);
            res.status(200).json(category);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    };

    updateCategory = async (req, res) => {
        const { id } = req.params;
        const currentUserId = req.user.id;
        try {
            const category = await this.categoryService.updateCategory(id, req.body, currentUserId);
            res.status(200).json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    deleteCategory = async (req, res) => {
        const { id } = req.params;
        const currentUserId = req.user.id;
        try {
            const result = await this.categoryService.deleteCategory(id, currentUserId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}
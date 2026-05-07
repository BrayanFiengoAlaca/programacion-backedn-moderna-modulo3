//Tarea 4 (paso 1)
import CategoryService from "../../application/use-cases/category.service.js";
import { jest } from "@jest/globals";

const mockRepository = {
    save: jest.fn(),
    findByUserId: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe("CategoryService - Pruebas Unitarias", () => {
    let categoryService;

    beforeEach(() => {
        categoryService = new CategoryService(mockRepository);
        jest.clearAllMocks();
    });

    test("Crear: debería crear una categoría correctamente", async () => {
        const data = { name: "Ideas", description: "Mis ideas creativas", userId: "user123" };
        const expectedResult = { ...data, id: "cat123" };
        mockRepository.save.mockResolvedValue(expectedResult);

        const result = await categoryService.createCategory(data);

        expect(mockRepository.save).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedResult);
    });

    test("Crear: debería fallar si no se proporciona el nombre", async () => {
        const data = { description: "Sin nombre", userId: "user123" };
        await expect(categoryService.createCategory(data)).rejects.toThrow("Name is required");
    });
});
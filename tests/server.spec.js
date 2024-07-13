// server.spec.js
const request = require("supertest");
const server = require("../index");

// Test para la ruta GET /cafes
describe("Operaciones CRUD de cafes", () => {
    test("La ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
        const response = await request(server).get("/cafes");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Test para la ruta DELETE /cafes/
    test("Se obtiene un código 404 al intentar eliminar un café con un id que no existe", async () => {
        const response = await request(server)
            .delete("/cafes/123456")
            .set("Authorization", "Bearer token");
        expect(response.status).toBe(404);
    });

    // Test para la ruta POST /cafes
    test("La ruta POST /cafes agrega un nuevo café y devuelve un código 201", async () => {
        const newData = { id: 5, nombre: "Espresso" };
        const response = await request(server)
            .post("/cafes")
            .send(newData);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(nuevoCafe)]));
    });

    // Test para la ruta PUT /cafes/
    test("La ruta PUT /cafes devuelve un status code 400 si el id en los parámetros es diferente al id en el payload", async () => {
        const dataUpdate = { id: 5, nombre: "Espresso coffee" };
        const response = await request(server)
            .put("/cafes/4")
            .send(dataUpdate);
        expect(response.status).toBe(400);
    });
});
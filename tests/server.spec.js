const request = require("supertest");
const server = require("../server.js");


    describe("Operaciones CRUD de cafes", () => {
        afterAll((done) => {
            server.close(done);
        });
        it("Obtiene un status 200 y un producto al hacer GET en /cafes", async () => {
            const response = await request(server).get("/cafes").send();
            const { statusCode, body } = response;
        
            expect(statusCode).toBe(200);
            expect(body).toBeInstanceOf(Array);
            expect(body.length).toBeGreaterThan(0); 
        });
        
        
            it("Debe devolver un código 404 al intentar eliminar un café con un ID que no existe", async () => {
                const cafeId = 999; 
        
                const response = await request(server)
                    .delete(`/cafes/${cafeId}`)
                    .set('Authorization', 'dummyToken'); 
                
                expect(response.status).toBe(404);
                
                
                expect(response.body).toEqual({ message: "No se encontró ningún cafe con ese id" });
            });
        

        it("Enviando un nuevo producto", async () => {
            const id = Math.floor(Math.random() * 999);
            const producto = { id, nombre: "Nuevo producto" };
            const { body: productos } = await request(server)
            .post("/cafes")
            .send(producto);
            expect(productos).toContainEqual(producto);
            });


        it("Debe devolver un código 400 si el ID en los parámetros no coincide con el ID en el payload al actualizar un café", async () => {
            const cafeId = 1; 
            const updatedCafe = {
                id: 2, 
                nombre: "Café Actualizado"
            };
            const response = await request(server)
                .put(`/cafes/${cafeId}`)
                .send(updatedCafe);
            
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "El id del parámetro no coincide con el id del café recibido" });
        });
        
        });

 
    

const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { sequelize } = require('./db');
const { Fruit, User } = require('./models/index')
const app = require('./src/app');
const seedData = require("./seedData");

describe('./fruits endpoint', () => {
    // Write your tests here
    test("Returns a status code of 200", async () => {
        const response = await request(app).get("/fruits");
        expect(response.statusCode).toBe(200);
    })

    test("Returns an array of seedData", async () => {
        const response = await request(app).get("/fruits");
        const responseData = JSON.parse(response.text);
        expect(responseData[0].name).toEqual("Apple");
    })
})

describe('./fruits/:id endpoint', () => {
    // Write your tests here
    test("Returns a status code of 200", async () => {
        const response = await request(app).get("/fruits/2");
        expect(response.statusCode).toBe(200);
    })

    test("Returns an array of seedData", async () => {
        const response = await request(app).get("/fruits/2");
        const responseData = JSON.parse(response.text);
        expect(responseData.name).toEqual("Banana");
    })
})

describe("POST /fruits", () => {
    test("should add a new fruit", async () => {
        const response = await request(app)
            .post("/fruits")
            .send({name: "strawberry", color: "red"});
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData.name).toEqual("strawberry");
    });
})

describe("PUT /fruits", () => {
    test("Returns a status code of 200", async () => {
        const response = await request(app).put("/fruits/1");
        expect(response.statusCode).toBe(200);
    })

    test("should update fruit", async () => {
        const response = await request(app)
            .put("/fruits/1")
            .send({name: "mango", color: "green"});
        expect(response.statusCode).toBe(200);
        const updatedData = await request(app).get("/fruits/1");
        const responseData = JSON.parse(updatedData.text);
        expect(responseData.name).toEqual("mango");
    });
})

describe("DELETE /fruits", () => {
    test("Returns a status code of 200", async () => {
        const response = await request(app).delete("/fruits/1");
        expect(response.statusCode).toBe(200);
    })

    test("fruit was deleted", async () => {
        const response = await request(app).get("/fruits");
        const responseData = JSON.parse(response.text);
        expect(responseData.length).toEqual(4);
    });
})

describe('./users endpoint', () => {
    // Write your tests here
    test("Returns a status code of 200", async () => {
        const response = await request(app).get("/users");
        expect(response.statusCode).toBe(200);
    })

    test("Returns an array of seedData", async () => {
        const response = await request(app).get("/users");
        const responseData = JSON.parse(response.text);
        expect(responseData[0].name).toEqual("User 1");
    })
})

describe('./users/:id endpoint', () => {
    // Write your tests here
    test("Returns a status code of 200", async () => {
        const response = await request(app).get("/users/2");
        expect(response.statusCode).toBe(200);
    })

    test("Returns an array of seedData", async () => {
        const response = await request(app).get("/users/2");
        const responseData = JSON.parse(response.text);
        expect(responseData.name).toEqual("User 2");
    })
})

describe("POST /users", () => {
    test("should add a new user", async () => {
        const response = await request(app)
            .post("/users")
            .send({name: "User 5", age: 35});
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData.name).toEqual("User 5");
    });
})

describe("PUT /users", () => {
    test("Returns a status code of 200", async () => {
        const response = await request(app).put("/users/1");
        expect(response.statusCode).toBe(200);
    })

    test("should update user", async () => {
        const response = await request(app)
            .put("/users/1")
            .send({name: "User 2", age: 52});
        expect(response.statusCode).toBe(200);
        const updatedData = await request(app).get("/users/1");
        const responseData = JSON.parse(updatedData.text);
        expect(responseData.age).toEqual(52);
    });
})

describe("DELETE /users", () => {
    test("Returns a status code of 200", async () => {
        const response = await request(app).delete("/users/1");
        expect(response.statusCode).toBe(200);
    })

    test("user was deleted", async () => {
        const response = await request(app).get("/users");
        const responseData = JSON.parse(response.text);
        expect(responseData.length).toEqual(3);
    });
})

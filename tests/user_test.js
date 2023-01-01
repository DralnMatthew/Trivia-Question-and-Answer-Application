import { superoak } from "../deps.js";
import { app } from "../app.js";
import * as userService from "../services/userService.js";
import { assertEquals, assertNotEquals } from "../deps.js"

Deno.test({
    name: "POST to /auth/register with password length less than 4 should not register successfully",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/register")
            .send("{\"email\": \"tests@tests.com\", \"password\": \"24\",}");
        const res = await userService.findUserByEmail("tests@tests.com");
        assertEquals(res.length, 0);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST to /auth/register stores the hashed password instead of in the form of plain text",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/register")
            .send("{\"email\": \"test@test.com\", \"password\": \"123456\",}");
        const res = await userService.findUserByEmail("test@test.com");
        assertNotEquals(res[0].password, "123456");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST to /auth/register with wrong email format should not register successfully",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/register")
            .send({"email": "12345", "password": "246810",});
        const res = await userService.findUserByEmail("12345");
        assertEquals(res.length, 0);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST to /auth/register with correct email and password should login successfully",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/login")
            .send({"email": "test1@tests.com", "password": "246810",}).expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
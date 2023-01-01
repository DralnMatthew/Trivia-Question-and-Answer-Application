import { superoak } from "../deps.js";
import { app } from "../app.js";

Deno.test({
    name: "GET request to /api/questions/random should return 200",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/api/questions/random").expect(200)
            .expect("Content-Type", new RegExp("application/json"));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST to /api/questions/answer with '{\"questionId\": 1,\"optionId\": 2}' should return '{\"correct\": false}'",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/api/questions/answer")
            .send("{\"questionId\": 1,\"optionId\": 2}")
            .expect({correct: false});
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST to /api/questions/answer with '{\"questionId\": 1,\"optionId\": 1}' should return '{\"correct\": true}'",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/api/questions/answer")
            .send("{\"questionId\": 1,\"optionId\": 1}")
            .expect({correct: true});
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
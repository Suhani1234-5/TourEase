process.env.NODE_ENV = "test";
process.env.DOTENV_CONFIG_QUIET = "true";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret";
process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "test-client-id";
process.env.GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET || "test-client-secret";
process.env.GOOGLE_CALLBACK_URL =
  process.env.GOOGLE_CALLBACK_URL || "http://localhost:5000/api/auth/google/callback";
process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || "test-openai-api-key";

const request = require("supertest");
const app = require("../app");

describe("health endpoint", () => {
  it("starts the Express app and responds successfully", async () => {
    const response = await request(app).get("/api/health").expect(200);

    expect(response.body).toEqual({
      success: true,
      message: "Server is running smoothly",
    });
  });
});
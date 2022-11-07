import { expect } from "chai";
import supertest from "supertest";
import { generateUser, generateProduct, generateChat } from "../dataFactory.js";
import getCookies from "./cookies.js";

let request;
let cookies;
let createdUser;

describe("Testing user routes", () => {
  before(async () => {
    request = supertest("http://localhost:8080");
  });

  describe("- POST /signup", () => {
    createdUser = generateUser();

    it("Should return 201", async () => {
      const response = await request.post("/signup").send(createdUser);
      expect(response.status).to.eql(201);
    });
  });

  describe("- POST /login", () => {
    it("Should return 200", async () => {
      const response = await request.post("/login").send(createdUser);
      cookies = getCookies(response.headers);
      expect(response.status).to.eql(200);
    });
  });

  describe("- GET /user", () => {
    let response;
    it("Should return 200", async () => {
      response = await request.get("/user").set({ cookie: cookies });
      expect(response.status).to.eql(200);
    });
    it("Should return logged in user", async () => {
      expect(response.body.usuario).to.eql(createdUser.username);
    });
  });

  describe("- GET /logout", () => {
    it("Should return 200", async () => {
      const response = await request.get("/logout").set({ cookie: cookies });
      expect(response.status).to.eql(200);
    });
  });

  describe("- GET /user", () => {
    it("Should return 401", async () => {
      const response = await request.get("/user");
      expect(response.status).to.eql(401);
    });
  });
});

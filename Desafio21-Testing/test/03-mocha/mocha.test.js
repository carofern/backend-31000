import { expect } from "chai";
import supertest from "supertest";
import { generateUser, generateProduct, generateChat } from "../dataFactory.js";

let request;
let cookies;
let createdProduct;

function getCookies(headers) {
  try {
    let cookies = headers["set-cookie"];
    cookies = cookies.map((cookie) => {
      const cookieContent = cookie.split(";");
      return cookieContent[0];
    });
    const result = cookies.join("; ");

    return result;
  } catch (error) {
    return null;
  }
}

describe("Testing product routes", () => {
  before(async () => {
    request = supertest("http://localhost:8080");

    const createdUser = generateUser();

    const postResponse = await request.post("/signup").send(createdUser);

    const response = await request.post("/login").send(createdUser);

    cookies = getCookies(response.headers);
  });

  describe("- POST /api/product", () => {
    let response;
    const productToCreate = generateProduct();

    it("Should return 201", async () => {
      response = await request
        .post("/api/productos")
        .set({ cookie: cookies })
        .send(productToCreate);
      createdProduct = response.body;
      expect(response.status).to.eql(201);
    });

    it("Should return the created product", () => {
      expect(response.body.title).to.eql(productToCreate.title);
      expect(response.body.price).to.eql(productToCreate.price);
      expect(response.body.thumbnail).to.eql(productToCreate.thumbnail);
    });
  });

  describe("- GET /api/product/:id", () => {
    let response;

    it("Should return 200", async () => {
      response = await request.get("/api/productos/" + createdProduct.id).set({ cookie: cookies });

      expect(response.status).to.eql(200);
    });

    it("Should return the created product", () => {
      expect(response.body.title).to.eql(createdProduct.title);
      expect(response.body.price).to.eql(createdProduct.price);
      expect(response.body.thumbnail).to.eql(createdProduct.thumbnail);
      expect(response.body.id).to.eql(createdProduct.id);
    });
  });

  describe("- DELETE /api/product/:id", () => {
    let response;

    it("Should return 200", async () => {
      response = await request
        .delete("/api/productos/" + createdProduct.id)
        .set({ cookie: cookies });

      expect(response.status).to.eql(200);
    });

    it("Should return the deleted product", () => {
      expect(response.body.title).to.eql(createdProduct.title);
      expect(response.body.price).to.eql(createdProduct.price);
      expect(response.body.thumbnail).to.eql(createdProduct.thumbnail);
      expect(response.body.id).to.eql(createdProduct.id);
    });
  });

  describe("- GET /api/product/:id", () => {
    let response;

    it("Should return 200", async () => {
      response = await request.get("/api/productos/" + createdProduct.id).set({ cookie: cookies });

      expect(response.status).to.eql(200);
    });

    it("Should return null id", () => {
      expect(response.body.id).to.null;
    });
  });
});

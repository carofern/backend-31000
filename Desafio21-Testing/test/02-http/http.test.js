import http from "http";
//const keepAliveAgent = new http.Agent({ keepAlive: true, maxSockets: 1 });
import { generateUser, generateProduct, generateChat } from "../dataFactory.js";

function getCookies(headers) {
  try {
    let cookies = headers["set-cookie"];
    cookies = cookies.map((cookie) => {
      const cookieContent = cookie.split(";");
      return cookieContent[0];
    });
    cookies = cookies.reduce((prev, curr) => {
      return prev + curr;
    });
    return cookies;
  } catch (error) {
    return null;
  }
}

function httpGet(hostname, port, path, agent, headers) {
  return new Promise((resolve, reject) => {
    let options = { hostname, port, path };
    if (headers) {
      options = { ...options, headers };
    }
    if (agent) {
      options = { ...options, agent };
    }
    const req = http.request(options, (response) => {
      let chunks_of_data = [];

      response.on("data", (fragments) => {
        chunks_of_data.push(fragments);
      });

      response.on("end", () => {
        let response_body = Buffer.concat(chunks_of_data);
        resolve({
          status: response.statusCode,
          cookies: getCookies(response.headers),
          data: response_body.toString(),
        });
      });

      response.on("error", (error) => {
        reject(error);
      });
    });
    req.end();
  });
}

function httpDelete(hostname, port, path, agent, headers) {
  return new Promise((resolve, reject) => {
    let options = {
      method: "DELETE",
      hostname,
      port,
      path,
    };
    if (headers) {
      options = { ...options, headers };
    }
    if (agent) {
      options = { ...options, agent };
    }
    const req = http.request(options, (response) => {
      let chunks_of_data = [];

      response.on("data", (fragments) => {
        chunks_of_data.push(fragments);
      });

      response.on("end", () => {
        let response_body = Buffer.concat(chunks_of_data);
        resolve({
          status: response.statusCode,
          cookies: getCookies(response.headers),
          data: response_body.toString(),
        });
      });

      response.on("error", (error) => {
        reject(error);
      });
    });
    req.end();
  });
}

function httpPost(data, hostname, port, path, agent, headers) {
  return new Promise((resolve, reject) => {
    let headersToSend = { "Content-Type": "application/json", "Content-Length": data.length };
    if (headers) {
      headersToSend = { ...headersToSend, ...headers };
    }
    const options = {
      hostname,
      port,
      method: "POST",
      path,
      headers: headersToSend,
    };
    if (agent) {
      options = { ...options, agent };
    }
    const req = http.request(options, (response) => {
      let chunks_of_data = [];

      response.on("data", (fragments) => {
        chunks_of_data.push(fragments);
      });

      response.on("end", () => {
        let response_body = Buffer.concat(chunks_of_data);
        resolve({
          status: response.statusCode,
          cookies: getCookies(response.headers),
          data: response_body.toString(),
        });
      });

      response.on("error", (error) => {
        reject(error);
      });
    });
    req.write(data);
    req.end();
  });
}

const hostname = "localhost";
const port = 8080;

const test = async () => {
  try {
    const testUser = generateUser();
    console.log("Create test user", JSON.stringify(testUser));
    let response = await httpPost(
      JSON.stringify(testUser),
      hostname,
      port,
      "/signup"
      //      keepAliveAgent
    );
    console.log(response.status);

    console.log("Login", JSON.stringify(testUser));
    response = await httpPost(JSON.stringify(testUser), hostname, port, "/login");
    console.log(response.status, response.data);

    const cookies = response.cookies;

    const product = generateProduct();
    console.log("Add new product", JSON.stringify(product));
    response = await httpPost(JSON.stringify(product), hostname, port, "/api/productos", null, {
      cookie: cookies,
    });
    console.log(response.status, response.data);

    const createdProduct = JSON.parse(response.data);

    console.log("Get product info ", createdProduct.id);
    response = await httpGet(hostname, port, "/api/productos/" + createdProduct.id, null, {
      cookie: cookies,
    });
    console.log(response.status, response.data);

    console.log("Delete product", createdProduct.id);
    response = await httpDelete(hostname, port, "/api/productos/" + createdProduct.id, null, {
      cookie: cookies,
    });
    console.log(response.status, response.data);

    console.log("Get deleted product info", createdProduct.id);
    response = await httpGet(hostname, port, "/api/productos/" + createdProduct.id, null, {
      cookie: cookies,
    });
    console.log(response.status, response.data);
  } catch (error) {
    console.log(error.message);
  }
};

(async function () {
  await test();
})();

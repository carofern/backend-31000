import axios from "axios";
import { generateUser, generateProduct, generateChat } from "../dataFactory.js";

function getCookies(headers) {
  let cookies = headers["set-cookie"];
  cookies = cookies.split(";")[0];
  return cookies;
}

const URL = "http://localhost:8080";

const test = async () => {
  try {
    const testUser = generateUser();
    console.log("Create test user");
    let response = await axios.post(URL + "/signup", testUser);
    console.log(response.status);

    console.log("Login");
    response = await axios.post(URL + "/login", testUser);
    console.log(response.status, response.data);

    const cookies = getCookies(response.headers);

    console.log("Add new product");
    const product = generateProduct();
    response = await axios.post(URL + "/api/productos", product, {
      headers: { cookie: cookies },
    });
    console.log(response.status, response.data);

    const createdProduct = response.data;

    console.log("Get product info");
    response = await axios.get(URL + "/api/productos/" + createdProduct.id, {
      headers: { cookie: cookies },
    });
    console.log(response.status, response.data);

    console.log("Delete product");
    response = await axios.delete(URL + "/api/productos/" + createdProduct.id, {
      headers: { cookie: cookies },
    });
    console.log(response.status, response.data);

    console.log("Get deleted product info");
    response = await axios.get(URL + "/api/productos/" + createdProduct.id, {
      headers: { cookie: cookies },
    });
    console.log(response.status, response.data);
  } catch (error) {
    console.log(error.message);
  }
};

(async function () {
  await test();
})();

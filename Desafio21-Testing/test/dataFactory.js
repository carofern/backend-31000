import { faker } from "@faker-js/faker";

function generateUser() {
  faker.locale = "en";
  return { username: faker.internet.userName(), password: faker.internet.password() };
}

function generateProduct() {
  faker.locale = "es";
  return {
    title: faker.commerce.product(),
    price: +faker.commerce.price(),
    thumbnail: faker.image.cats(),
  };
}

function generateChat() {
  faker.locale = "en";
  const userName = faker.internet.userName();
  faker.locale = "es";
  return {
    author: {
      email: faker.internet.email(),
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      edad: faker.random.numeric(2),
      alias: userName,
      avatar: faker.internet.avatar(),
    },
    text: faker.lorem.paragraph(),
    fechahora: faker.date.recent(),
  };
}

export { generateUser, generateProduct, generateChat };

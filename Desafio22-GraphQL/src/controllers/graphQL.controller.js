import { graphqlHTTP } from "express-graphql";
import productoSchema from "../graphql/productos.schema.js";
import { productController } from "../controllers/index.js";

export default graphqlHTTP({
  schema: productoSchema,
  rootValue: {
    getProducto: productController.getProductos,
    getProductos: productController.getProductos,
    createProducto: productController.addProducto,
    updateProducto: productController.updateProducto,
    deleteProducto: productController.removeProducto,
  },
  graphiql: true,
});

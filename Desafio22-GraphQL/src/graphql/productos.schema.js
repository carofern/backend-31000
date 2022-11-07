import { buildSchema } from "graphql";

const productoSchema = buildSchema(`
    input ProductoInput {
        title: String,
        price: Float,
		thumbnail: String,
    }

    type Producto {
        id: ID!,
        title: String,
        price: Float,
		thumbnail: String,
    }

    type Query {
        getProducto(id: ID!): Producto,
        getProductos: [Producto],
    }

    type Mutation {
        createProducto(datos: ProductoInput): Producto,
        updateProducto(id: ID!, datos: ProductoInput): Producto,
        deleteProducto(id: ID!): Producto,
    }
`);

export default productoSchema;

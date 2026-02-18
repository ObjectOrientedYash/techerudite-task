import {gql} from 'apollo-server-express';

const typeDefs = gql`
    type Category {
        id: ID!
        name: String!
    }

    type Product {
        id: ID!
        name: String!
        description: String
        quantity: Int!
        categories: [Category]
        createdAt: String
    }

    type ProductResponse {
        data: [Product]
        total: Int
    }

    type Query {
        products(page: Int, limit: Int, search: String, categories: [Int]): ProductResponse

        categories: [Category]
    }

    type Mutation {
        addProduct(name: String!, description: String, quantity: Int!, categories: [Int]!): Product

        deleteProduct(id: ID!): Boolean
    }
`;

export default typeDefs;

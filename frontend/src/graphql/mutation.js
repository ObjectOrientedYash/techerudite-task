import {gql} from '@apollo/client';

export const ADD_PRODUCT = gql`
    mutation AddProduct($name: String!, $description: String, $quantity: Int!, $categories: [Int]!) {
        addProduct(name: $name, description: $description, quantity: $quantity, categories: $categories) {
            id
            name
        }
    }
`;

export const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id)
    }
`;

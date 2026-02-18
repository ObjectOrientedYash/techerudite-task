import {gql} from '@apollo/client';

export const GET_PRODUCTS = gql`
    query GetProducts($page: Int, $limit: Int, $search: String, $categories: [Int]) {
        products(page: $page, limit: $limit, search: $search, categories: $categories) {
            total
            data {
                id
                name
                quantity
                createdAt # ✅ IMPORTANT
                categories {
                    id
                    name
                }
            }
        }
    }
`;

export const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            id
            name
        }
    }
`;

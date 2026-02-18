import {Op} from 'sequelize';
import {Product, Category} from '../models/index.js';
import {productSchema} from '../validation/product.validation.js';

const resolvers = {
    Query: {
        products: async (_, {page = 1, limit = 5, search, categories}) => {
            const offset = (page - 1) * limit;

            let where = {};
            if (search) {
                where.name = {[Op.iLike]: `%${search}%`};
            }

            const include = [
                {
                    model: Category,
                    where: categories?.length ? {id: {[Op.in]: categories}} : undefined,
                    required: !!categories?.length
                }
            ];

            const {count, rows} = await Product.findAndCountAll({
                where,
                include,
                distinct: true,
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            });

            return {data: rows, total: count};
        },

        categories: async () => {
            return Category.findAll();
        }
    },

    Mutation: {
        addProduct: async (_, args) => {
            productSchema.parse(args);

            const product = await Product.create({
                name: args.name,
                description: args.description,
                quantity: args.quantity
            });

            if (args.categories?.length) {
                await product.setCategories(args.categories);
            }

            return product;
        },

        deleteProduct: async (_, {id}) => {
            await Product.destroy({where: {id}});
            return true;
        }
    }
};

export default resolvers;

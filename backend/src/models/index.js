import Category from './category.model.js';
import Product from './product.model.js';

/**
 * Associations
 */
Product.belongsToMany(Category, {
    through: 'ProductCategories'
});

Category.belongsToMany(Product, {
    through: 'ProductCategories'
});

export {Product, Category};

import sequelize from '../config/db.js';
import {Category} from '../models/index.js';

const categories = [{name: 'Electronics'}, {name: 'Clothing'}, {name: 'Books'}, {name: 'Home'}];

const seed = async () => {
    try {
        await sequelize.sync();

        for (const cat of categories) {
            await Category.findOrCreate({where: {name: cat.name}});
        }

        console.log('Category seeded');
        process.exit();
    } catch (error) {
        console.error(error);
    }
};

seed();

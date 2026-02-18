import dotenv from 'dotenv';
import app from './app.js';
import sequelize from './config/db.js';
import {connectDB} from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}/graphql`);
        });
    } catch (error) {
        console.error('Server Error:', error);
    }
};

startServer();

import { Sequelize } from "sequelize";
import { Student } from "../models/Student";

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: './src/database/database.sqlite'
});


Student.start(connection);

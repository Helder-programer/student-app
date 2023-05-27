import { Sequelize } from "sequelize";
import { Student } from "../models/student/Student";

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: './src/database/database.sqlite'
});


Student.start(connection);

import { Model, DataTypes, Sequelize } from 'sequelize';

import { IStudent } from '../../interfaces/IStudent';


export class Student extends Model implements IStudent {
    declare id: number;
    declare name: string;
    declare both_date: string;
    declare email: string;
    declare status: string;


    public static start(connection: Sequelize) {
        return this.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },

                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                both_date: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                status: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: false
                }
            },
            {
                sequelize: connection,
                freezeTableName: true,
                modelName: 'tb_students',
                createdAt: 'created_at',
                updatedAt: 'updated_at',
            }
        );
    }
}
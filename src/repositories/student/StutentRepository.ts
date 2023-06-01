import { Op } from "sequelize";
import { ApiError } from "../../helpers/apiError";


import { IStudentRepository } from "../../interfaces/IStudentRepository";
import { Student } from "../../models/Student";
import { ICreateStudentDTO } from "./dtos/ICreateStudentDTO";
import { ISearchStudentDTO } from "./dtos/ISearchStudentDTO";
import { IUpdateStudentDTO } from "./dtos/IUpdateStudentDTO";

export class StudentRepository implements IStudentRepository {

    public async create({ name, bothDate, email, status }: ICreateStudentDTO): Promise<void> {
        bothDate =  bothDate.replace(/-/g, '\/');
        const newStudent = Student.build({ name, both_date: bothDate, email, status });
        await newStudent.save();
    }

    public async findAll() {
        const students = await Student.findAll();
        return students;
    }


    public async findById(id: number): Promise<Student> {
        const searchedStudent = await Student.findByPk(id);
        if (searchedStudent)
            return searchedStudent;
        else
            throw new ApiError('Student not found!', 404);
    }

    public async update({ id, name, bothDate, email, status }: IUpdateStudentDTO) {
        const studentToUpdate = await this.findById(id);
        bothDate =  bothDate.replace(/-/g, '\/');

        studentToUpdate.name = name;
        studentToUpdate.both_date = bothDate;
        studentToUpdate.email = email;
        studentToUpdate.status = status;

        studentToUpdate.save();
    }

    public async remove(id: number): Promise<void> {
        const studentToDelete = await this.findById(id);

        studentToDelete.destroy();
    }


    public async searchStudents({ name }: ISearchStudentDTO): Promise<Student[]> {
        const searchedStudents = await Student.findAll({ where: { name: { [Op.like]: `%${name}%` } } });
        return searchedStudents;
    }
}
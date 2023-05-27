import { Student } from "../../models/student/Student";
import { ICreateStudentDTO } from "./dtos/ICreateStudentDTO";
import { IUpdateStudentDTO } from "./dtos/IUpdateStudentDTO";

export class StudentRepository {

    public static async create({ name, bothDate, email, status }: ICreateStudentDTO) {
        const newStudent = Student.build({ name, both_date: bothDate, email, status });
        await newStudent.save();
    }

    public static async findAll() {
        const students = await Student.findAll();
        return students;
    }


    public static async findById(id: number) {
        const searchedStudent = await Student.findByPk(id);
        if (searchedStudent)
            return searchedStudent;
        else
            throw new Error('Estudante não encontrado!');
    }

    public static async update({ id, name, bothDate, email, status }: IUpdateStudentDTO) {
        const studentToUpdate = await StudentRepository.findById(id);

        studentToUpdate.name = name;
        studentToUpdate.both_date = bothDate;
        studentToUpdate.email = email;
        studentToUpdate.status = status;

        studentToUpdate.save();
    }

    public static async remove(id: number) {
        const studentToDelete = await StudentRepository.findById(id);

        studentToDelete.destroy();
    }
}
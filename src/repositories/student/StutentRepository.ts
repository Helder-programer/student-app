import { database } from "../../database";
import { Student } from "../../entities/student/Student";
import { ICreateStudentDTO } from "./dtos/ICreateStudentDTO";
import { IUpdateStudentDTO } from "./dtos/IUpdateStudentDTO";

export class StudentRepository {
    private static getNextId() {
        let nextId = 1;
        const lastStudent = database[database.length - 1];
        if (lastStudent)
            return nextId = lastStudent.id + 1;
        return nextId;
    }

    public static async create({ name, bothDate, email, status }: ICreateStudentDTO) {
        const nextId = this.getNextId();
        const student = new Student(nextId, name, bothDate, email, status);
        database.push(student);
    }

    public static async findAll() {
        const students = database;
        return students;
    }


    public static async findById(id: number) {
        const searchedStudent = database.find(student => student.id === id);
        return searchedStudent;
    }

    public static async update({ id, name, bothDate, email, status }: IUpdateStudentDTO) {
        const studentToUpdate = await this.findById(id);
        if (studentToUpdate) {
            studentToUpdate.name = name;
            studentToUpdate.bothDate = bothDate;
            studentToUpdate.email = email;
            studentToUpdate.status = status;
        } else {
            throw new Error('Problema ao editar usuário');
        }
    }


    public static async remove(id: number) {
        const studentToDelete = await this.findById(id);

        if (studentToDelete) {
            database.splice(database.indexOf(studentToDelete), 1);   
        } else {
            throw new Error('Problema ao deletar usuário');
        }
    }
}
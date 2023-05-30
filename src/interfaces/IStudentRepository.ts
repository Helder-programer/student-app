import { Student } from "../models/Student";
import { ICreateStudentDTO } from "../repositories/student/dtos/ICreateStudentDTO";
import { ISearchStudentDTO } from "../repositories/student/dtos/ISearchStudentDTO";
import { IUpdateStudentDTO } from "../repositories/student/dtos/IUpdateStudentDTO";

export interface IStudentRepository {
    create(data: ICreateStudentDTO): Promise<void>;

    findAll(): Promise<Student[]>;

    findById(id: number): Promise<Student>;

    update(data: IUpdateStudentDTO): Promise<void>;

    remove(id: number): Promise<void>;

    searchStudents(data: ISearchStudentDTO): Promise<Student[]>;
}
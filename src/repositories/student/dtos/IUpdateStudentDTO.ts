import { Student } from "../../../models/Student";

export interface IUpdateStudentDTO {
    id: number;
    name: string;
    bothDate: string;
    status: string;
    email: string;
}
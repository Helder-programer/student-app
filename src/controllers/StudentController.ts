import express, { Request, Response } from 'express';
import moment from 'moment';
import { ApiError } from '../helpers/apiError';

import { IStudentRepository } from '../interfaces/IStudentRepository';
import { Student } from '../models/Student';

export class StudentController {

    constructor(
        private studentRepository: IStudentRepository
    ) {
        this.studentRepository = studentRepository;
    }


    public async index(req: Request, res: Response) {
        const { searchedName }: any = req.query;
        let students: Student[] = [];

        if (!searchedName) {
            students = await this.studentRepository.findAll();
        } else {
            students = await this.studentRepository.searchStudents({ name: searchedName });
        }

        res.status(200).render('index', { students, moment, searchedName });

    }

    public async showNew(req: Request, res: Response) {
        res.render('new');
    }

    public async showEdit(req: Request, res: Response) {
        const { id }: any = req.params;


        const studentToUpdate = await this.studentRepository.findById(id);
        res.status(200).render('edit', { studentToUpdate });

    }

    public async create(req: Request, res: Response) {
        const { name, bothDate, email, status, }: any = req.body;


        await this.studentRepository.create({ name, bothDate, status, email });
        res.redirect('/');

    }

    public async update(req: Request, res: Response) {
        const { name, bothDate, email, status, } = req.body;
        let { id }: any = req.params;


        await this.studentRepository.update({ id, name, bothDate, email, status });
        return res.redirect('/');

    }

    public async remove(req: Request, res: Response) {
        const { id }: any = req.params;


        await this.studentRepository.remove(id);
        return res.redirect('/');

    }
}
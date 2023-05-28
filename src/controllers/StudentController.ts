import express, { Request, Response } from 'express';
import moment from 'moment';

import { Student } from '../models/Student';
import { StudentRepository } from '../repositories/student/StutentRepository';

class StudentController {

    public async index(req: Request, res: Response) {
        const { searchedName }: any = req.query;
        let students: Student[] = [];


        try {
            if (!searchedName) {
                students = await StudentRepository.findAll();
            } else {
                students = await StudentRepository.searchStudents({ name: searchedName });
            }
            
            res.render('index', { students, moment, searchedName });
        } catch (error: any) {
            console.log(error);
        }
    }

    public async showNew(req: Request, res: Response) {
        res.render('new');
    }

    public async showEdit(req: Request, res: Response) {
        const { id }: any = req.params;

        try {
            const studentToUpdate = await StudentRepository.findById(id);
            res.render('edit', { studentToUpdate });
        } catch (error) {
            console.log(error);
        }
    }

    public async create(req: Request, res: Response) {
        const { name, bothDate, email, status, }: any = req.body;

        try {
            await StudentRepository.create({ name, bothDate, status, email });
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    }

    public async update(req: Request, res: Response) {
        const { name, bothDate, email, status, } = req.body;
        let { id }: any = req.params;

        try {
            await StudentRepository.update({ id, name, bothDate, email, status });
            return res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    }

    public async remove(req: Request, res: Response) {
        const { id }: any = req.params;

        try {
            await StudentRepository.remove(id);
            return res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    }
}

export default new StudentController();
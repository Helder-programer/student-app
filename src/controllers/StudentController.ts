import express, { Request, Response } from 'express';
import { StudentRepository } from '../repositories/student/StutentRepository';

class StudentController {

    public async index(req: Request, res: Response) {
        const students = await StudentRepository.findAll();
        res.render('index', { students });
    }

    public async showNew(req: Request, res: Response) {
        res.render('new');
    }

    public async showEdit(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const studentToUpdate = await StudentRepository.findById(Number(id));
            console.log(studentToUpdate);
            res.render('edit', { studentToUpdate });
        } catch (error) {
            console.log(error);
        }
    }

    public async create(req: Request, res: Response) {
        const { name, bothDate, email, status, } = req.body;

        try {
            await StudentRepository.create({ name, bothDate, status, email });
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    }

    public async update(req: Request, res: Response) {
        const { name, bothDate, email, status, } = req.body;
        let { id } = req.params;

        const studentId = Number(id);

        try {
            await StudentRepository.update({ id: studentId, name, bothDate, email, status });
            return res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    }

    public async remove(req: Request, res: Response) {
        const { id } = req.params;

        try {
            StudentRepository.remove(Number(id));
            return res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    }

}

export default new StudentController();
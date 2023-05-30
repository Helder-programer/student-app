import express from 'express';
import { StudentController } from '../controllers/StudentController';
import { StudentRepository } from '../repositories/student/StutentRepository';
const router = express.Router();

const studentRepository = new StudentRepository();


const controller = new StudentController(studentRepository);


router.get('/', (req, res) => controller.index(req, res));

router.get('/create', (req, res) => controller.showNew(req, res));
router.post('/create', (req, res) => controller.create(req, res));

router.get('/update/:id', (req, res) => controller.showEdit(req, res));
router.put('/update/:id', (req, res) => controller.update(req, res));

router.delete('/delete/:id', (req, res) => controller.remove(req, res));

export default router;
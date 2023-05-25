import express from 'express';
import StudentController from '../controllers/StudentController';
const router = express.Router();

router.get('/', StudentController.index);

router.get('/create', StudentController.showNew);
router.post('/create', StudentController.create);

router.get('/update/:id', StudentController.showEdit);
router.put('/update/:id', StudentController.update);

router.delete('/delete/:id', StudentController.remove);

export default router;
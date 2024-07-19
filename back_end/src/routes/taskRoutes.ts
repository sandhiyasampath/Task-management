import { Router } from 'express';
import { getTasks, getTask, createTaskController, updateTaskController, deleteTaskController } from '../controllers/taskController';

const router = Router();
router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createTaskController);
router.put('/:id', updateTaskController);
router.delete('/:id', deleteTaskController);

export default router;

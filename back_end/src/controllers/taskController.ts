import { Request, Response } from 'express';
import { getTasksByUserId, getTaskById, createTask, updateTask, deleteTask } from '../models/task';

export const getTasks = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const tasks = await getTasksByUserId(userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching tasks.' });
  }
};

export const getTask = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  try {
    const task = await getTaskById(id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).send({ message: 'Task not found.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error fetching task.' });
  }
};

export const createTaskController = async (req: Request, res: Response) => {
  const { title, description, status } = req.body;
  const userId = req.userId;

  try {
    await createTask(userId, title, description, status);
    res.status(201).send({ message: 'Task created successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Error creating task.' });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, description, status } = req.body;

  try {
    await updateTask(id, title, description, status);
    res.status(200).send({ message: 'Task updated successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Error updating task.' });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await deleteTask(id);
    res.status(200).send({ message: 'Task deleted successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting task.' });
  }
};

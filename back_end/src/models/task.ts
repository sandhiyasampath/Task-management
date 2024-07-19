import db from '../config/database';

export const getTasksByUserId = async (userId: number) => {
  const sql = 'SELECT * FROM tasks WHERE userId = ?';
  const tasks = await (await db).all(sql, userId);
  return tasks;
};

export const getTaskById = async (id: number) => {
  const sql = 'SELECT * FROM tasks WHERE id = ?';
  const task = await (await db).get(sql, id);
  return task;
};

export const createTask = async (userId: number, title: string, description: string, status: string) => {
  const sql = 'INSERT INTO tasks (userId, title, description, status) VALUES (?, ?, ?, ?)';
  await (await db).run(sql, userId, title, description, status);
};

export const updateTask = async (id: number, title: string, description: string, status: string) => {
  const sql = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
  await (await db).run(sql, title, description, status, id);
};

export const deleteTask = async (id: number) => {
  const sql = 'DELETE FROM tasks WHERE id = ?';
  await (await db).run(sql, id);
};

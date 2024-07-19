import db from '../config/database';

export const getUserByUsername = async (username: string) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const user = await (await db).get(sql, [username]);
    return user;
};

export const createUser = async (username: string, password: string) => {
    await (await db).run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
};

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByUsername, createUser } from '../models/user';

const jwtSecret = 'your_jwt_secret';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    await createUser(username, hashedPassword);
    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Error registering user.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: 86400 });
      res.status(200).send({ token });
    } else {
      res.status(401).send({ message: 'Invalid credentials.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error logging in.' });
  }
};

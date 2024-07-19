import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const db = open({
  filename: './database.db',
  driver: sqlite3.Database
});

export default db;

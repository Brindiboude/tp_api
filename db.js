// Connexion à la base de données
import Database from 'better-sqlite3';

const db = new Database('database.db');

export default db;

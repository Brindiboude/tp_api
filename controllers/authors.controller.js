import db from '../db.js';

// Récupérer tous les auteurs
export const getAuthors = (req, res) => {
    const authors = db.prepare('SELECT * FROM authors').all();
    res.json(authors);
};

// Créer un auteur
export const createAuthor = (req, res) => {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Le champ name est obligatoire' });
  }
    
    const result = db.prepare('INSERT INTO authors (name) VALUES (?)').run(name);
    res.status(201).json({ id: result.lastInsertRowid, name });
};

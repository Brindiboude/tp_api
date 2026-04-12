import db from '../db.js';

// Récupérer tous les articles
export const getArticles = (req, res) => {
  const articles = db.prepare(`
    SELECT articles.id, articles.title, articles.content, authors.name AS author
    FROM articles
    JOIN authors ON articles.author_id = authors.id
  `).all();

  res.json(articles);
};

// Récupérer un article par son id
export const getArticleById = (req, res) => {
  const article = db.prepare(`
    SELECT articles.id, articles.title, articles.content, authors.name AS author
    FROM articles
    JOIN authors ON articles.author_id = authors.id
    WHERE articles.id = ?
  `).get(req.params.id);

  if (!article) {
    return res.status(404).json({ error: 'Article introuvable' });
  }

  res.json(article);
};

// Créer un article
export const createArticle = (req, res) => {
  const { title, content, author_id } = req.body;

  if (!title || !content || !author_id) {
    return res.status(400).json({ error: 'Données manquantes' });
  }

  const author = db.prepare('SELECT * FROM authors WHERE id = ?').get(author_id);

  if (!author) {
    return res.status(404).json({ error: 'Auteur introuvable' });
  }

  const result = db
    .prepare('INSERT INTO articles (title, content, author_id) VALUES (?, ?, ?)')
    .run(title, content, author_id);

// plus lisible comme ça
  res.status(201).json({
    id: result.lastInsertRowid,
    title,
    content,
    author_id
  });
};

// Modifier un article
export const updateArticle = (req, res) => {
  const { title, content, author_id } = req.body;
  const { id } = req.params;

  const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(id);

  if (!article) {
    return res.status(404).json({ error: 'Article introuvable' });
  }

  db.prepare(`
    UPDATE articles
    SET title = ?, content = ?, author_id = ?
    WHERE id = ?
  `).run(title, content, author_id, id);

  res.json({
    id,
    title,
    content,
    author_id
  });
};

// Supprimer un article
export const deleteArticle = (req, res) => {
  const { id } = req.params;

  const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(id);

  if (!article) {
    return res.status(404).json({ error: 'Article introuvable' });
  }

  db.prepare('DELETE FROM articles WHERE id = ?').run(id);

  res.json({ message: 'Article supprimé' });
};

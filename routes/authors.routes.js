import express from 'express';
import { getAuthors, createAuthor, getArticlesByAuthor } from '../controllers/authors.controller.js';

const router = express.Router();

router.get('/', getAuthors);
router.post('/', createAuthor);
router.get('/:id/articles', getArticlesByAuthor);

export default router;

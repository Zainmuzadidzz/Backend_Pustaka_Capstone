import express from "express";
import {getBooks, getBookById, createBook, updateBook, deleteBook} from "../controllers/Books.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/books', verifyUser, adminOnly, getBooks);
router.get('/book/:id', verifyUser, adminOnly, getBookById);
router.post('/book', verifyUser, adminOnly, createBook);
router.patch('/book/:id', verifyUser, adminOnly, updateBook);
router.delete('/book/:id', verifyUser, adminOnly, deleteBook);

export default router;
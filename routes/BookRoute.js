import express from "express";
import {getBooks, getBookById, createBook, updateBook, deleteBook} from "../controllers/Books.js";
const router = express.Router();

router.get('/books', getBooks);
router.get('/book/:id', getBookById);
router.post('/book', createBook);
router.patch('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);

export default router;
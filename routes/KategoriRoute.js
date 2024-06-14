import express from "express";
import {getKategoris, getKategoriById, createKategori, updateKategori, deleteKategori} from "../controllers/Kategoris.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/kategoris', verifyUser, getKategoris);
router.get('/kategori/:id', verifyUser, adminOnly, getKategoriById);
router.post('/kategori', verifyUser, adminOnly, createKategori);
router.patch('/kategori/:id', verifyUser, adminOnly, updateKategori);
router.delete('/kategori/:id', verifyUser, adminOnly, deleteKategori);

export default router;
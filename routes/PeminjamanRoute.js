import express from "express";
import {getPeminjamans, getPeminjamanById, createPeminjaman, updatePeminjaman, deletePeminjaman} from "../controllers/Peminjamans.js";
const router = express.Router();

router.get('/peminjamans', getPeminjamans);
router.get('/peminjaman/:id', getPeminjamanById);
router.post('/peminjaman', createPeminjaman);
router.patch('/peminjaman/:id', updatePeminjaman);
router.delete('/peminjaman/:id', deletePeminjaman);

export default router;
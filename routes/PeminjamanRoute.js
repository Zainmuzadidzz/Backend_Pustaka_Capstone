import express from "express";
import {getPeminjamans, getPeminjamanById, createPeminjaman, updatePeminjaman, deletePeminjaman} from "../controllers/Peminjamans.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/peminjamans', verifyUser, getPeminjamans);
router.get('/peminjaman/:id', verifyUser, getPeminjamanById);
router.post('/peminjaman', verifyUser, createPeminjaman);
router.patch('/peminjaman/:id', verifyUser, adminOnly, updatePeminjaman);
router.delete('/peminjaman/:id', verifyUser, adminOnly, deletePeminjaman);

export default router;
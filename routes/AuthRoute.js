import express from "express";
import {Login, me, Logout} from "../controllers/Auth.js";
const router = express.Router();

router.get('/me', me);
router.post('/login', Login);
router.delete('/logout', Logout);

export default router;
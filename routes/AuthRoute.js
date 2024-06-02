import express from "express";
import {Login, me, Logout, test} from "../controllers/Auth.js";
const router = express.Router();

router.get('/me', me);
router.post('/login', Login);
router.delete('/logout', Logout);
router.get('/', test);

export default router;
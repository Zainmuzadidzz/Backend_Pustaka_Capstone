import express from "express";
import {Login, me, Logout, test, Register} from "../controllers/Auth.js";
const router = express.Router();

router.get('/me', me);
router.post('/login', Login);
router.post('/register', Register);
router.delete('/logout', Logout);
router.get('/', test);

export default router;
import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import KategoriRoute from "./routes/KategoriRoute.js";
import BookRoute from "./routes/BookRoute.js";
import PeminjamanRoute from "./routes/PeminjamanRoute.js"
dotenv.config();

const app = express();

(async()=>{
    await db.sync();
})();
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json);
app.use(UserRoute);
app.use(KategoriRoute);
app.use(BookRoute);
app.use(PeminjamanRoute);

app.listen(process.env.APP_PORT, () => {
    console.log(`App listening on port ${process.env.APP_PORT}`);
})
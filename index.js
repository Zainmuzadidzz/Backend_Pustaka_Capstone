import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import KategoriRoute from "./routes/KategoriRoute.js";
import BookRoute from "./routes/BookRoute.js";
import PeminjamanRoute from "./routes/PeminjamanRoute.js"
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

// aktifkan saat pertama kali di jalankan
// (async()=>{
//     await db.sync();
// })();



app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: 'auto' }
}))

app.use(cors({
    credentials: true,
    origin: '*'
}));
app.use(express.json());
app.use(UserRoute);
app.use(KategoriRoute);
app.use(BookRoute);
app.use(PeminjamanRoute);
app.use(AuthRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server up and running',port)
});

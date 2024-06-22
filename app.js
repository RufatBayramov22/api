import express from "express";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

// CORS middleware'ini ayarla
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));


app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
  });


app.use(express.json());
app.use(cookieParser()); 

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

app.listen(8800, () => {
    console.log("Server is Running");
});

app.get("/", (req, res) => {
    res.json("Hello");
});

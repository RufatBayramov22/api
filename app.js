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
// Configure CORS
const corsOptions = {
    origin: 'http://tapal.az', // Allow requests from this origin
    credentials: true // Allow credentials (cookies, authorization headers)
  };
  
  app.use(cors(corsOptions));

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://tapal.az');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
  });

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ['http://tapal.az']); // Add your domain
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());
app.use(cookieParser()); 

app.use("/auth", authRoute);
app.use("/posts", postRoute);
app.use("/users", userRoute);

app.listen(8800, () => {
    console.log("Server is Running");
});

app.get("/", (req, res) => {
    res.json("Hello");
});

import express from "express";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

const app = express();
dotenv.config();

app.use(helmet());
// // CORS siyasətini tətbiq edin
// app.use(cors({
//     origin: 'http://tapal.az', // Yalnız tapal.az domainindən sorğulara icazə verin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Müəyyən metodları dəstəkləyin
//     allowedHeaders: ['Content-Type', 'Authorization'] // İcazə verilmiş başlıqları təyin edin
//   }));
  const corsOptions = {
    origin: 'http://tapal.az', // Allow requests from this origin
    credentials: true // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));
  
  // OPTIONS metodunu əməliyyatına qoyun
  app.options('*', cors()); // Bütün URL-lər üçün OPTIONS istəyi dəstəkləyin
  
  // Digər tətbiq üçün qlobal CORS headerləri təyin edin
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://tapal.az');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });
  

app.use(express.json());
app.use(cookieParser());


app.use("/auth", authRoute);
app.use("/posts", postRoute);
app.use("/users", userRoute);

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.listen(8800, () => {
    console.log("Server is Running");
});

app.get("/", (req, res) => {
    res.json("Hello");
});

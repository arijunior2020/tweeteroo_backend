import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/usersRoutes.js";
import tweetsRouter from "./routes/tweetsRoutes.js";

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rotas
app.use(usersRouter);
app.use(tweetsRouter);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("🚀 Tweteroo backend rodando!");
});

app.listen(PORT, () => {
    console.log(`🔊 Servidor rodando em http://localhost:${PORT}`);
});

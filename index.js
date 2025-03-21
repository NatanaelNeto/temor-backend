import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use('/palavras', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0",  () => console.log(`Servidor rodando na porta ${PORT}`));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Conectado'))
    .catch((err) => console.log("Erro ao conectar ao MongoDB: ", err));


import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routerPalavras from "./routes/palavras.js";
import routerUsuarios from "./routes/usuarios.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use('/palavras', routerPalavras);
app.use("/usuarios", routerUsuarios);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0",  () => console.log(`Servidor rodando na porta ${PORT}`));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Conectado'))
    .catch((err) => console.log("Erro ao conectar ao MongoDB: ", err));


import express from "express";
import Palavra from './models/palavras.js';

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const palavras = await Palavra.find();
        res.json(palavras);
    } catch (err) {
        res.status(500).json({
            code: 500,
            error: "Erro ao buscar palavras",
        })
    }
});

router.post("/", async(req, res) => {
    try {
        const { texto } = req.body;
        if (!texto) return res.status(400).json({
            code: 400,
            error: "É necessário enviar uma palavra",
        });

        const novaPalavra = new Palavra({ texto });
        novaPalavra.save();

        res.status(201).json({
            code: 201,
            texto: novaPalavra.texto,
        })
    } catch (err) {
        res.status(500).json({
            code: 500,
            error: "Erro ao criar a palavra",
        })
    }
});

export default router;
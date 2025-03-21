import express from "express";
import Palavra from './models/palavras.js';
import { validarPalavra } from './utils/middlewares.js';

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const palavras = await Palavra.find();
        res.json(palavras);
    } catch (err) {
        res.status(500).json({
            code: 500,
            error: "Erro ao buscar palavras",
            message: err,
        })
    }
});

router.post("/", validarPalavra, async(req, res) => {
    try {
        const { texto } = req.body;
        if (!texto) return res.status(400).json({
            code: 400,
            error: "É necessário enviar uma palavra",
            message: err,
        });

        const novaPalavra = new Palavra({ texto });
        novaPalavra.save();

        res.status(201).json({
            code: 201,
            message: "Palavra criada com sucesso",
            texto: novaPalavra.texto,
        })
    } catch (err) {
        res.status(500).json({
            code: 500,
            error: "Erro ao criar a palavra",
            message: err,
        })
    }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const palavraRemovida = await Palavra.findByIdAndDelete(id);

    if (!palavraRemovida) {
      return res.status(404).json({
        code: 404,
        error: "Palavra não encontrada",
        message: err,
      });
    }

    res.status(204).json({
      code: 204,
      message: "Palavra removida com sucesso",
      texto: palavraRemovida.texto,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      error: "Erro ao remover palavra",
      message: err,
    });
  }
});

export default router;
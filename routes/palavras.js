import express from "express";
import Palavra from '../models/palavras.js';
import { validarArray, validarPalavra, verificarToken } from '../utils/middlewares.js';

const routerPalavras = express.Router();

routerPalavras.get("/", async (req, res) => {
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

routerPalavras.post("/", verificarToken, validarPalavra, async (req, res) => {
  try {
    const { texto } = req.body;
    if (!texto) return res.status(400).json({
      code: 400,
      error: "É necessário enviar uma palavra",
      message: err,
    });

    const novaPalavra = new Palavra({ texto });
    await novaPalavra.save();

    res.status(201).json({
      code: 201,
      message: "Palavra criada com sucesso",
      texto: novaPalavra.texto,
    })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        code: 400,
        error: "Palavra já cadastrada",
        message: err,
      });
    }
    res.status(500).json({
      code: 500,
      error: "Erro ao criar a palavra",
      message: err,
    })
  }
});

routerPalavras.post("/multiplas", verificarToken, validarArray, async (req, res) => {
  try {
    const novasPalavras = req.palavrasValidas.map((texto) => ({ texto }));

    const palavrasInseridas = await Palavra.insertMany(novasPalavras, { ordered: false });

    res.status(201).json({ code: 201, message: "Palavras adicionadas com sucesso", palavras: palavrasValidas });
  } catch (err) {
    res.status(500).json({ code: 500, error: "Erro ao adicionar palavras", message: err });
  }
});

routerPalavras.delete("/:id", verificarToken, async (req, res) => {
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

export default routerPalavras;
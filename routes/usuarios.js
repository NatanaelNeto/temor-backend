import express from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuarios.js";
import { verificarToken } from "../utils/middlewares.js";

const routerUsuarios = express.Router();

// Registrar usuário (apenas para criar a conta inicial)
routerUsuarios.post("/register", verificarToken, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ code: 400, error: "Usuário e senha são obrigatórios" });
    }

    const usuarioExiste = await Usuario.findOne({ username });
    if (usuarioExiste) {
      return res.status(400).json({ code: 400, error: "Usuário já existe" });
    }

    const novoUsuario = new Usuario({ username, password });
    await novoUsuario.save();

    res.status(201).json({ code: 201, message: "Usuário registrado com sucesso" });
  } catch (err) {
    res.status(500).json({ code: 500, error: "Erro ao registrar usuário", message: err.message });
  }
});

// Login
routerUsuarios.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(401).json({ code: 401, error: "Usuário ou senha inválidos" });
    }

    const senhaValida = await usuario.compararSenha(password);
    if (!senhaValida) {
      return res.status(401).json({ code: 401, error: "Usuário ou senha inválidos" });
    }

    console.log(senhaValida);

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ code: 200, token });
  } catch (err) {
    res.status(500).json({ code:500, error: "Erro ao fazer login", message: err.message });
  }
});

export default routerUsuarios;

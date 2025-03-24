export const validarPalavra = (req, res, next) => {
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({
      code: 400,
      error: "O campo 'texto' é obrigatório",
    });
  }
  if (typeof texto !== 'string' || texto.length !== 5) {
    return res.status(400).json({
      code: 400,
      error: "A palavra deve ter exatamente 5 letras",
    })
  }

  next();
}

export const validarArray = (req, res, next) => {
  const { palavras } = req.body;

  if (!Array.isArray(palavras)) {
    return res.status(400).json({
      code: 400,
      error: "O campo 'palavras' precisa ser um array",
    });
  }
  
  const palavrasValidas = palavras.filter((palavra) => typeof palavra === "string" && palavra.length === 5 && /^[a-zA-Z]+$/.test(palavra));
  
  if (palavrasValidas.length === 0) {
    return res.status(400).json({
      code: 400,
      error: "Nenhuma palavra válida encontrada",
    });
  }

  req.palavrasValidas = palavrasValidas;
  next();
}
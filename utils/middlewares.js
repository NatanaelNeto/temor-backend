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
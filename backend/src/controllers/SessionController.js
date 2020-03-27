const connection = require('../database/connection');

module.exports = {
  async create (req, res) { // Cria uma sessão.
    const { id } = req.body; // Pega o id vindo do corpo da requisição.

    const ong = await connection('ongs') // Conecta à tabela ongs.
      .where('id', id) // Procura pelo id no banco vindo do body.
      .select('name') // Seleciona somente o nome.
      .first(); // Somente um resultado, para não vir em formato de Array.

    if (!ong) { // Se não encontrar a ONG, erro.
      return res.status(400).json({ error: 'No ONG found with this ID!' });
    }

    return res.json(ong); // Retorna o resultado, ou seja, o nome da ONG.
  }
}
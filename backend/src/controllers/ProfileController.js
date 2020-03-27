const connection = require('../database/connection');

module.exports = {
  async index(req, res) { // Lista os casos.
    const ong_id = req.headers.authorization; // Autorização.

    const incidents = await connection('incidents')
      .where('ong_id', ong_id) // Busca todos os incidents que tal ONG criou.
      .select('*'); // Seleciona todos os campos.

    return res.json(incidents); // Retorana em JSON os incidents.
  }
}
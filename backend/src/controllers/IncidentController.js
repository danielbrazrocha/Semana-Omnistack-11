const connection = require('../database/connection');

module.exports = {
  async index(request, response) { // Listar os casos.
    const { page = 1 } = request.query; // Busca por page, se não existir, padrão = 1
    
    const [count] = await connection('incidents')
        .count(); //Envia ao front-end quantos casos temos no total.

    const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // *Join do SQL para buscar dados de outra tabela//
        .limit(5) // Limita a 5 o número de registros por vez//
        .offset((page - 1) * 5) // *Pula de 5 em 5//
        .select([ // Para não haver conflitos com a id da ONG, foi feita essa separação.//
            'incidents.*', // Todos os campos de incidents.//
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
          ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents); //Envia o total pelo cabeçalho da resposta da requisição.//
  },

  async create (request, response) { // Criação do caso.
    const { title, description, value } = request.body; // Dados vindo do corpo.
    const ong_id = req.headers.authorization; // *Autorização.

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return response.json({ id });
  },

  async delete(request, response) { // Deletar um caso.
    const { id } = request.params; // Pega o id vindo como parâmetro.
    const ong_id = request.headers.authorization; // *Autorização.

    const incident = await connection('incidents')
      .where('id', id) // Buscar onde o id for igual ao id passado.
      .select('ong_id') // Selecionar a coluna ong_id.
      .first(); // Retorna apenas um resultado.

    if (incident.ong_id !== ong_id) { // Erro se não autorizado.
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection ('incidents').where('id', id).delete(); // Deleta o caso.

    return response.status(204).send(); // Envia o estado de sucesso sem conteúdo.
  }
}
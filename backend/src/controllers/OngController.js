const crypto = require('crypto'); //Chama a ferramenta crypto para auxiliar na criação da Id da ONG

const connection = require('../database/connection'); /* Importa arquivo de conexao com o BD*/

module.exports = {

    async index (req, res) { // index será responsável por listar as ONGs.
        const ongs = await connection('ongs').select('*');
      
        return res.json(ongs);
      },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body; // Dados pegos do corpo.
    
        const id = crypto.randomBytes(4).toString('HEX'); // *Gera um id aleatório.
    
        await connection('ongs').insert({ // *Assincronia e insere na tabela ongs.
            id,
            name,
            email,
            whatsapp,
            city,
            uf
          });
    
        return response.json({ id });
        }
    };



const express  = require('express'); /* Chamando o express*/

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

/* Criar vaiável routes, desacoplando o modulo de rotas do express em uma nova variável */
const routes = express.Router();

routes.post('/sessions', SessionController.create); // Criar Sessão.

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index); // Listar os casos de uma ONG.

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete); // o ".id" é necessário para identificar o caso a ser deletado//

/* conteudo migrado para OngController.js com ajustes
routes.get('/ongs', async (req, res) => {
    const ongs = await connection('ongs').select('*');
  
    return res.json(ongs);
  });*/

/* conteudo migrado para OngController.js com ajustes
routes.post('/ongs', async (request, response) => {
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
        
}); */

/* Exportando as rotas para que estas estejam disponíveis para a aplicação no index possa acessá-las*/
/* No index é necessário importar as rotas para que funcione*/
module.exports = routes;


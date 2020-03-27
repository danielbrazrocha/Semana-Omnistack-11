/*Carregar o framework Express para a variável express. A variável irá conter todas as ferramentas necessárias a aplicação.*/
const express = require('express');

/* Importando as rotas definidas no arquivo separado*/
/* ./ é utilizado para demonstrar que é um arquivo, e não um pacote*/
/* ./ é mesma pasta */
/* ../ chama a pasta anterior hierarquicamente */
const routes = require('./routes');

//Carrega o CORS para manter uma maior segurança da aplicação
const cors = require('cors');


/*Definir que a variável irá armazenar a aplicação.*/
const app = express();

/* Chama o uso do CORS */
/*Caso já estivessemos em produção, poderia ser passado um parâmtro para possibilitar que apenas uma origem acessasse o backend, ex:
app.use(cors({
    origin: 'http://meuapp.com'
}));
 */
app.use(cors());

/* Informa ao express que utilizaremos o JSON para repassar os comandos ao backend*/
app.use(express.json());

/* */
app.use(routes);

    
/*Ordena que o servidor backend "ouça" a porta 3333 constante
//Verificar abrindo o Chrome na URL localhost:3333
//Instalar a extensão JSON Viewer no Chrome para facilitar a visualização das respostas do servidor*/
app.listen(3333);
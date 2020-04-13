const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');


const app = express();

app.use(cors());
app.use(express.json());

/**
 *  GET: Busca informações do back-end
 *  POST: Criar uma informação no back-end
 *  PUT/PATCH: Alterar uma informação no back-end
 *  DELETE: Deletar uma informação no back-end
 */

/*
* Tipos de parâmetros:
*
* Query Params: Filtros e paginação
* Route Params: Identificar recursos (Atualizar/Deletar)
* Request Body: Conteúdo na hora criar ou editar um recurso (JSON)
*/

/**
 * Middleware:
 * 
 * Interceptador de requisições que interrompe totalmente a requisição, 
 * ou pode alterar dados da requisição
 */


const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log('1');
  console.time(logLabel);

  //return next(); // próximo middleware
  next(); //quando tiver que executar comando, códigos após o middleware

  console.log('2');
  console.timeEnd(logLabel)


}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid projec ID' });
  }
  //só irá para o próximo middleware caso o id seja um "id" válido
  return next();
}

//app.use(logRequests); //quando não tiver "return" no middleware e 
//middleware não estiver inserido na rota

//não usar o middleware na rota
app.get('/projects', logRequests, (request, response) => {
  //refinar a busca com filtros
  console.log('3');
  const { title } = request.query;

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects; //retornar todos os projetos caso não tenha o filtro
  return response.json(results);

});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;
  project = { id: uuid(), title, owner };
  projects.push(project);
  return response.json(project);
});

app.put('/projects/:id', validateProjectId, (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id == id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  //variavel com os dados dos recebidos pelos parametros "params e body"
  const project = {
    id,
    title,
    owner,
  };

  //alterar(update na posição do array pelos dados contidos na variavel "project")
  //projectIndex, pega a posição do array
  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', validateProjectId, (request, response) => {

  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id == id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' });
  }
  //exclui o project na posição do id(projectIndex)
  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log('🚀Back-end started');
});
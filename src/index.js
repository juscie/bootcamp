const express = require('express');

const app = express();

app.get('/projects', (request, response) => {
  return response.json({ message: 'Oi Hello World' });
});

app.post('/projects', (request, response) => {
  return response.json([
    'projeto 1',
    'projeto 2',
    'projeto 3',
  ]);
});

app.put('/projects/:id', (request, response) => {
  return response.json([
    'projeto 1',
    'projeto 2',
    'projeto 3',
  ]);
});

app.delete('/projects/:id', (request, response) => {
  return response.json([
    'projeto 2',
    'projeto 3',
  ]);
});

app.listen(3333, () => {
  console.log('🚀Back-end started');
});
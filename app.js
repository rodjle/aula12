const express = require('express');
const fs = require('fs'); // Importa o módulo de file system
const app = express();
const port = 3000;

// Middleware para analisar o body das requisições
app.use(express.json());

let alunos = [];

fs.readFile('alunos.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo de alunos:', err);
    } else {
      // Parse do JSON e armazenamento na variável 'alunos'
      const jsonData = JSON.parse(data);
      alunos = jsonData.alunos;
      console.log('Dados dos alunos carregados com sucesso.');
    }
  });
  

// Rota GET para listar todos os alunos
app.get('/alunos', (req, res) => {
  res.json(alunos);
});

// Rota GET para pegar um aluno específico pelo código
app.get('/alunos/:codigo', (req, res) => {
  const { codigo } = req.params;
  const aluno = alunos.find(al => al.codigo === parseInt(codigo));
  if (aluno) {
    res.json(aluno);
  } else {
    res.status(404).json({ message: 'Aluno não encontrado' });
  }
});

// Rota POST para adicionar um novo aluno
app.post('/alunos', (req, res) => {
  const { codigo, nome, idade, turma } = req.body;
  const novoAluno = { codigo, nome, idade, turma };
  alunos.push(novoAluno);
  res.status(201).json(alunos);
});

// Rota DELETE para remover um aluno pelo código
app.delete('/alunos/:codigo', (req, res) => {
  const { codigo } = req.params;
  const index = alunos.findIndex(al => al.codigo === parseInt(codigo));
  if (index !== -1) {
    alunos.splice(index, 1);
    res.json(alunos);
  } else {
    res.status(404).json({ message: 'Aluno não encontrado' });
  }
});

// Inicializando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

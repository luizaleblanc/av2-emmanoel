const express = require('express');
const cors = require('cors');
const { connect } = require('./db/banco');

const app = express();
const PORT = 3000; // Porta que o Front-End está esperando (http://localhost:3000)

// Middleware CORS
// ESSENCIAL para permitir que seu front-end (rodando em http://localhost:5173) 
// se comunique com esta API (rodando em http://localhost:3000).
app.use(cors()); 

// Middleware para processar JSON nas requisições POST/PUT
app.use(express.json());

// ===============================================
// DADOS MOCKADOS
// IMPORTANTE: O front-end React espera a propriedade 'id'
// Para simular o MongoDB, estamos usando '_id' aqui para nos prepararmos 
// para o próximo passo (embora 'id' também funcionasse por enquanto).
// ===============================================
let mockTarefas = [
    { 
        id: 1361434473096, 
        texto: 'Configurar a API Node.js com Express', 
        concluida: true 
    },
    { 
        id: 1461434473096, 
        texto: 'Testar a busca de dados no componente App.jsx', 
        concluida: false 
    },
    { 
        id: 1561434473096, 
        texto: 'Começar a estilização dos componentes com Bootstrap', 
        concluida: false 
    },
];

// ===============================================
// CAMADA DE ACESSO A DADOS (REPOSITORY)
// ===============================================
class AutorRepository {
    async buscarTodos() {
        const conexao = await connect();
        try {
            // Busca id, nome e nacionalidade 
            const [rows] = await conexao.execute('SELECT id, nome, nacionalidade FROM autor');
            return rows;
        } finally {
            await conexao.end();
        }
    }

    async criarAutor(nome, nacionalidade) {
        const conexao = await connect();
        try {
            const sql = 'INSERT INTO autor (nome, nacionalidade) VALUES (?, ?)';
            const [result] = await conexao.execute(sql, [nome, nacionalidade]);
            return result.insertId; // Retorna o ID gerado pelo AUTO_INCREMENT 
        } finally {
            await conexao.end();
        }
    }

    async deletarAutor(id) {
        const conexao = await connect();
        try {
            const sql = 'DELETE FROM autor WHERE id = ?';
            const [result] = await conexao.execute(sql, [id]);
            return result.affectedRows > 0;
        } finally {
            await conexao.end();
        }
    }
}

const repositorio = new AutorRepository();

// ROTA 1: GET /autores (BUSCAR TODOS) - Substitui o GET de tarefas [cite: 5]
app.get('/autores', async (req, res) => {
    try {
        console.log('Requisição GET recebida em /autores');
        const autores = await repositorio.buscarTodos();
        res.status(200).json(autores);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar autores no banco de dados.' });
    }
});


// ===============================================
// ROTA 1: GET /tarefas (BUSCAR TODAS)
// ===============================================
app.get('/tarefas', (req, res) => {
    console.log('Requisição GET recebida em /tarefas');
    
    // Simplesmente retorna o array mockado
    return res.json(mockTarefas);
});

// ===============================================
// ROTA 2: POST /tarefas (CRIAR NOVA TAREFA) - NOVO
// ===============================================
app.post('/tarefas', (req, res) => {
    // Pega o 'texto' do corpo da requisição JSON enviado pelo Front-end
    const { texto } = req.body;

    if (!texto) {
        return res.status(400).json({ erro: 'O campo texto é obrigatório.' });
    }

    const novaTarefa = {
        // Gera um ID único simulando o comportamento do MongoDB
        id: Date.now(), 
        texto,
        concluida: false
    };

    // Adiciona a nova tarefa ao array (em memória)
    mockTarefas.push(novaTarefa);

    // Retorna a tarefa criada (o Front-end precisa do _id gerado)
    return res.status(201).json(novaTarefa);
});

// ===============================================
// ROTA 3: DELETE /tarefas/:id (EXCLUIR TAREFA) - NOVO
// ===============================================
app.delete('/tarefas/:id', (req, res) => {
    // Pega o ID da URL (ex: /tarefas/12345)
    const { id } = req.params;

    // Filtra a lista, removendo a tarefa com o ID correspondente
    const tamanhoOriginal = mockTarefas.length;
    mockTarefas = mockTarefas.filter(t => t.id.toString() !== id.toString());
    
    // Verifica se alguma tarefa foi removida
    if (mockTarefas.length === tamanhoOriginal) {
        return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    // Retorna um status 204 (No Content) indicando sucesso sem corpo de resposta
    return res.status(204).send();
});

// Rota simples de teste (opcional)
app.get('/', (req, res) => {
    res.send(`API de Tarefas rodando na porta ${PORT}`);
});


// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Pronto para atender requisições do seu Front-End React.');
});
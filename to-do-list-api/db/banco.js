const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'luiza123',
    database: 'biblioteca' 
};

/**
 * Função para estabelecer e retornar a conexão com o banco de dados.
 */
async function connect() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        return connection;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error;
    }
}

module.exports = { connect };
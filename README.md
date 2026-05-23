# Lista de Tarefas - MVP Full-Stack

## Visão Geral
Aplicação web enxuta desenvolvida para o gerenciamento de tarefas. O projeto serve como um Produto Mínimo Viável (MVP) focado na integração completa entre a interface de utilizador, o servidor da API e o banco de dados. O projeto estabelece uma base sólida orientada a componentes no front-end e o padrão de repositório no back-end.

## Arquitetura e Tecnologias
O projeto segue uma arquitetura de separação clara de responsabilidades:
* **Front-end:** Desenvolvido em React.js utilizando Vite como ferramenta de build. O roteamento é gerido pelo React Router DOM.
* **Back-end:** Construído em Node.js com o framework Express para a gestão das requisições HTTP, rotas e middleware CORS.
* **Banco de Dados:** MySQL. A comunicação é feita de forma assíncrona utilizando o pacote `mysql2`.

## Planeamento e Execução
Este MVP está estruturado para ser entregue por uma equipa num ciclo de desenvolvimento de 10 dias. As atividades estão mapeadas no Jira e divididas entre tarefas de interface, criação de endpoints e lógica de repositório de dados.

## Requisitos do Sistema
* Node.js (versão 18 ou superior) 
* NPM (Node Package Manager) 
* Servidor MySQL (8.0 ou compatível) a correr localmente na porta 3306 

## Configuração do Banco de Dados
A aplicação espera uma ligação local ao MySQL. A estrutura importada inicialmente utiliza:
* Host: localhost 
* Porta: 3306 
* Utilizador: root
* Senha: sua_senha
* Banco de Dados alvo: biblioteca 

Certifique-se de que o serviço MySQL está ativo antes de arrancar a API.

### Script de Criação das Tabelas
O enriquecimento lógico pré-existente requer as seguintes tabelas no banco `biblioteca`

```sql
CREATE TABLE autor (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(255) NOT NULL,
  nacionalidade varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE livro (
  id int NOT NULL AUTO_INCREMENT,
  titulo varchar(255) NOT NULL,
  ano_publicacao int DEFAULT NULL,
  genero varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

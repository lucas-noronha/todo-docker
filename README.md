# ToDo App com Docker

Uma aplicação ToDo composta por:

- API em .NET 9 (ASP.NET Core)
  - Implementando Swagger
  - EF Core como ORM

- Frontend em React (build via Node.js e servido pelo Nginx)

- Banco de dados PostgreSQL

> Clique [aqui](https://github.com/lucas-noronha/todo-docker/blob/main/DESENVOLVIMENTO.md) para ver mais detalhes sobre processo de desenvolvimento do projeto

---

# Pré-requisitos:

Para conseguir rodar o projeto corretamente é ideal que tenha os pré-requisitos abaixo instalados ou versões superiores

1. [Docker](https://docs.docker.com/get-docker/) (versão mínima recomendada: 20.10+)

2. [Docker Compose](https://docs.docker.com/compose/install/) (versão mínima recomendada: 1.29+)

---

# Estrutura Básica:

O projeto tem a seguinte estrutura de arquivos:

. \
├── backend \
│ ├── ToDo.Api \
│ │ └── Dockerfile \
│ ├── ToDo.Domain \
│ ├── ToDo.Data \
│ └── DbScripts \
├── frontend \
│ ├── Dockerfile \
│ ├── nginx.conf \
│ ├── src/ (código React) \
└── docker-compose.yml

---

# Como Rodar

Siga os seguintes passos para que os contêineres sejam criados:

1. Clone o repositório:

    ````git clone https://github.com/lucas-noronha/todo-docker.git ````

2. Navegue até a pasta raiz do proejeto no seu computador

    ````cd [camininho] ````

3. Execute o Docker Compose (no diretório raiz):

    ```` docker-compose up --build ````

Isso irá:

- Subir o serviço “db” (PostgreSQL) na porta 5433

- Construir e iniciar a “api” (.NET 9) na porta 8080

- Construir e iniciar o “frontend” (React + Nginx) na porta 5174

> Nota: Na primeira execução deste passo a passo o processo pode ser um pouco demorado.

---

# Acessando os Sistemas

1. Frontend (React): \
  Acesse no navegador: http://localhost:5174 

2. API (.NET 9):
  Base URL: http://localhost:8080 \
  Exemplos: \
  GET http://localhost:8080/swagger (se Swagger estiver habilitado) \
  GET http://localhost:8080/todo

3. Banco de Dados (PostgreSQL): \
  Host: localhost \
  Porta: 5433 \
  Database: todo_db \
  User: postgres \
  Password: Postgres2024!

---

# Parar e Remover Contêineres
1. No diretório raiz do projeto rode o seguinte comando para remover o cluster de contêineres: \
```` docker-compose down ````

2. Para remover volumes (limpar dados): \
```` docker-compose down -v ````

---

<div align="center">
  <h2>Obrigado Pela Visita</h2>
  <img src="https://i.pinimg.com/originals/83/68/97/836897e81911bce85b058a166e8d47d3.gif" alt="GIF de Demonstração" />
</div>
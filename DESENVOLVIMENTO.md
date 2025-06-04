# Documento de Desenvolvimento

Este documento descreve o planejamento e as etapas de desenvolvimento do meu projeto ToDo App, organizado em 2 sprints de 5 dias cada, utilizando a metodologia ágil Kanban e o Trello como ferramenta de gerenciamento.

---

## 1. Planejamento do Projeto

O objetivo principal do projeto é criar uma aplicação de lista de tarefas (ToDo) composta por:
- **Backend** em .NET 9 (API RESTful)
- **Frontend** em React
- **Banco de dados** PostgreSQL
- **Dockernização** das três camadas para facilitar a implantação

Para estruturar as atividades, criei um quadro Kanban no Trello com as seguintes colunas:
- **Backlog**: todas as tarefas planejadas
- **To Do (A Fazer)**: tarefas selecionadas para a sprint corrente
- **Doing (Em Progresso)**: tarefas em execução
- **Review (Em Revisão)**: tarefas prontas aguardando revisão
- **Done (Concluído)**: tarefas finalizadas

### Exemplo de Tarefas no Backlog

1. **Configurar projeto .NET 9**
2. **Criar endpoints REST básicos (GET /todos, POST /todos)**
3. **Configurar Entity Framework Core e migrations**
4. **Desenvolver modelo de dados para Tarefa**
5. **Implementar documentação da API via Swagger**
6. **Criar projeto React com Create React App**
7. **Desenvolver tela de listagem de tarefas (frontend)**
8. **Implementar comunicação frontend ↔ backend (fetch/axios)**
9. **Configurar PostgreSQL local e scripts iniciais**
10. **Configurar ambiente Docker para PostgreSQL**
11. **Criar Dockerfile para API**
12. **Criar Dockerfile para frontend**
13. **Elaborar docker-compose.yml**
14. **Testes manuais de integração entre serviços**
15. **Documentação do README.md e Desenvolvimento.md**
16. **Ajustes finais e otimizações (caching, CORS, variáveis de ambiente)**


---

## 2. Quantidade e Duração das Sprints

- **Sprint 1**  
  - **Duração**: 5 dias (de segunda-feira a sexta-feira)  
  - **Objetivo**: Desenvolver as aplicações frontend e backend em ambiente local (sem Docker)

- **Sprint 2**  
  - **Duração**: 5 dias (de segunda-feira a sexta-feira da semana seguinte)  
  - **Objetivo**: Implementar a dockernização completa dos serviços (PostgreSQL, API e frontend)

Cada sprint seguiu o fluxo Kanban, puxando as tarefas do Backlog para “To Do” conforme eu tinha disponibilidade, mantendo o limite de WIP (Work In Progress) de 3 itens simultâneos para evitar gargalos.

---

## 3. Metodologia Ágil Utilizada

- **Kanban**:  
  - Fluxo contínuo sem iteração fixa (embora eu tenha organizado as sprints para fins de planejamento)  
  - Controle de WIP (máximo de 3 tarefas “Em Progresso” ao mesmo tempo)  
  - Entregas incrementais à medida que cada tarefa é concluída  
  - Revisão diária do quadro no Trello (daily stand-up informal comigo mesmo)

Não houve cerimônias formais de Scrum, apenas uma adaptação leve do Kanban, com reuniões rápidas de 15 minutos diárias para alinhar prioridades e remover impedimentos pessoais.

---

## 4. Ferramentas Utilizadas

- **Trello**  
  - Quadro Kanban online  
  - Listas: Backlog, To Do, Doing, Review, Done  
  - Etiquetas coloridas para identificar tipo de tarefa (Frontend, Backend, Docker, Documentação)

- **Visual Studio / VS Code**  
  - Desenvolvimento da API e do frontend

- **PostgreSQL (local)**  
  - Para testes iniciais antes da dockernização

- **Docker & Docker Compose**  
  - Containerização dos serviços  
  - Orquestração via docker-compose.yml

---

## 5. Descrição dos Sprints

### Sprint 1 (Dias 1 a 5)

1. **Configurar projeto .NET 9 (Dia 1)**  
   - Criei solução e projetos: `ToDo.Api`, `ToDo.Domain`, `ToDo.Data`  
   - Configurei Entity Framework Core com Npgsql  
   - Modelei a entidade `Tarefa` (Id, Título, Descrição, DataCriacao, Concluida)
   - Implementei documentação rica via Swashbuckle com suporte a UI do Swagger

2. **Desenvolver endpoints básicos (Dia 1–2)**  
   - Implementei `GET /api/todos` → lista de tarefas  
   - Implementei `POST /api/todos` → criar nova tarefa  
   - Implementei `PUT /api/todos/{id}` → atualizar status de conclusão  
   - Implementei `DELETE /api/todos/{id}` → remover tarefa

3. **Configurar projeto React (Dia 2)**  
   - Executei `npx create-react-app todo-frontend`  
   - Estruturei pastas: components, services, pages  

4. **Desenvolver lista de tarefas no frontend (Dia 3–4)**  
   - Criei componente `<TodoList />`  
   - Consumi a API via `fetch` ou `axios`  
   - Exibi botões para adicionar, marcar como concluída e excluir  

5. **Integração e testes manuais (Dia 4–5)**  
   - Testei fluxo completo local (API + frontend apontando para `http://localhost:5000`)  
   - Ajustei CORS na API para permitir requisições de `http://localhost:3000`  
   - Criei migrations iniciais e populei banco de dados local  

6. **Revisão de código e ajustes finais Sprint 1 (Dia 5)**  
   - Revisei os projetos criados e suas funções para que na próxima sprint não houvesse pendências
   - Movi cartões para “Review” e depois para “Done” no Trello  

### Sprint 2 (Dias 6 a 10)

1. **Configurar Docker para PostgreSQL (Dia 6)**  
   - Criei volume `postgres_data`  
   - Coloquei scripts SQL iniciais em `backend/DbScripts`  
   - Testei container localmente (`docker run -d postgres:15 …`)  

2. **Criar Dockerfile para API (Dia 6–7)**  
   - Etapa de build com `mcr.microsoft.com/dotnet/sdk:9.0`  
   - Etapa de runtime com `mcr.microsoft.com/dotnet/aspnet:9.0`  
   - Exponho porta `8080` e configuro `ENTRYPOINT ["dotnet", "ToDo.Api.dll"]`

3. **Criar Dockerfile para frontend (Dia 7)**  
   - Etapa de build com `node:18` → `npm install` + `npm run build`  
   - Etapa Nginx com `nginx:stable-alpine` → copie `dist/` para `/usr/share/nginx/html`  
   - Substituí `nginx.conf` para redirecionar rotas de SPA

4. **Elaborar arquivo docker-compose.yml (Dia 8)**  
   - Serviços: `db` (PostgreSQL), `api`, `frontend`  
   - Define dependências (api depende de db healthy; frontend depende de api)  
   - Mapeei portas:
     - `db`: `5433:5432`
     - `api`: `8080:8080`
     - `frontend`: `5174:80`
   - Defini volumes e network (`todo-net`)

5. **Testes de integração em containers (Dia 9)**  
   - Executei `docker-compose up --build`  
   - Verifiquei logs via `docker-compose logs -f api` e `docker-compose logs -f db`  
   - Validei funcionalidades no navegador:
     - Frontend: `http://localhost:5174`
     - API: `http://localhost:8080/swagger` ou endpoints diretos  

6. **Ajustes de configuração e otimizações (Dia 9–10)**  
   - Ajustei variáveis de ambiente (connection string)  
   - Validei CORS entre containers  
   - Otimizei tamanho das imagens (limpei camadas intermediárias)  
   - Documentei README.md e atualizei o roteiro de desenvolvimento

7. **Revisão de código e merge final (Dia 10)**  
   - Configurei meu pull request como “Done” no Trello  
   - Fiz push das alterações finais no repositório  
   - Registrei tag de release (v1.0.0)

---

## 6. Desafios Enfrentados e Soluções

1. **CORS entre Frontend e Backend**  
   - *Desafio*: Ao rodar a API em `http://localhost:8080` e o React em `http://localhost:3000` (na Sprint 1), houve erros de CORS.  
   - *Solução*: Configurei `builder.Services.AddCors(...)` no `Program.cs` da API para permitir origem `http://localhost:3000` (posteriormente `http://localhost:5174`).

2. **Configuração de Healthcheck no PostgreSQL**  
   - *Desafio*: A API iniciava antes do PostgreSQL estar pronto, resultando em falha ao tentar aplicar migrations.  
   - *Solução*: No `docker-compose.yml`, adicionei `healthcheck` no serviço `db` usando `pg_isready -U postgres` e configurei `depends_on: condition: service_healthy` para o serviço `api`.

3. **Tamanho Excessivo da Imagem da API**  
   - *Desafio*: A imagem da API ficava muito grande quando o build e runtime eram realizados na mesma etapa.  
   - *Solução*: Utilizei multi-stage build: etapa “build” com o SDK .NET 9 e depois etapa “runtime” com apenas o ASP.NET 9, copiando somente os arquivos publicados para a imagem final.

4. **Rotas do React em Nginx (SPA)**  
   - *Desafio*: Ao acessar URLs diretamente no frontend (por exemplo, `/tasks/123`), o Nginx retornava 404 em vez de redirecionar para `index.html`.  
   - *Solução*: Ajustei `nginx.conf` com `try_files $uri $uri/ /index.html;` dentro do bloco `location /`.

5. **Sincronização de Versões de Dependências**  
   - *Desafio*: Dependências do EF Core em .NET e a extensão Npgsql não estavam alinhadas, causando erros de runtime.  
   - *Solução*: Unifiquei a versão de pacotes no `csproj` (por exemplo, usei `Npgsql.EntityFrameworkCore.PostgreSQL` compatível com `.NET 9`).

---

## 7. Conclusão

Através de duas sprints de 5 dias cada, usando Kanban e Trello, foi possível:
- Desenvolver a API em .NET 9 com funcionalidades CRUD básicas
- Criar o frontend em React consumindo a API
- Containerizar toda a solução (PostgreSQL, API e frontend) com Docker e Docker Compose
- Superar os principais desafios de CORS, healthchecks, configurações do Nginx e permissões de logs

Este documento registra todo o fluxo de trabalho, as ferramentas utilizadas, as tarefas planejadas e os obstáculos enfrentados durante o desenvolvimento do projeto.
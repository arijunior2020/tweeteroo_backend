# 🐦 Tweteroo API

API REST que simula o funcionamento básico do antigo Twitter, desenvolvida em Node.js com MongoDB.

## 🚀 Tecnologias

- Node.js
- Express
- MongoDB
- Joi
- Dotenv

## 📁 Estrutura

tweteroo_backend/
├── src/
│ ├── app.js
│ ├── database/
│ ├── controllers/
│ ├── routes/
│ └── schemas/
├── .env
├── .gitignore
├── package.json
└── README.md

## 📦 Instalação e uso

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/tweteroo-backend.git
cd tweteroo-backend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto e adicione a variável de ambiente `DATABASE_URL` e `PORT` com a URL e porta usadas do seu banco de dados MongoDB:

```
DATABASE_URL=mongodb://localhost:27017/tweteroo
PORT=5000
```

4. Inicie o servidor:

```bash
npm start
```

5. Acesse a API em `http://localhost:5000`.

## 📄 Testando com o Frontend

- Vá até a pasta tweteroo_front-end
- Clique com o botão direito no index.html e selecione "Open with Live Server"
- Acesse: http://localhost:5500 (ou porta sugerida pelo Live Server)

O frontend interagirá com a API automaticamente

## 📮 Rotas da API

### Usuários

- `POST /sign-up`: Cria um novo usuário.
```
Exemplo de corpo da requisição:{
  "username": "bobesponja",
  "avatar": "https://bobesponja.com.br/imagens/thumbnail.png"
}
```
**### Respostas esperadas**
- 201 Created → sucesso
- 409 Conflict → usuário já existe
- 422 Unprocessable Entity → campos inválidos

### Tweets

- `POST /tweets`: Cria um novo tweet.
```
Exemplo de corpo da requisição:{
  "username": "bobesponja",
  "content": "Eu sou um exemplo de tweet!"
}
```
**### Respostas esperadas**
- 201 Created → sucesso
- 401 Unauthorized → usuário não encontrado
- 422 Unprocessable Entity → campos inválidos


- `GET /tweets`: Lista todos os tweets em ordem decrescente.

**### Respostas esperadas**
- 200 OK → sucesso


- `PUT /tweets/:id`: Atualiza um tweet específico.
```
Exemplo de corpo da requisição:{
  "username": "bobesponja",
  "tweet": "Eu sou um tweet atualizado!"
}
```
**### Respostas esperadas**
- 204 No Content → sucesso
- 404 Not Found → tweet não encontrado
- 422 Unprocessable Entity → campos inválidos

- `DELETE /tweets/:id`: Deleta um tweet específico.

204 No Content → sucesso
404 Not Found → tweet não encontrado

## 📘 Observações
As coleções users e tweets são usadas no MongoDB.

## 📎 Autor
Arimatéia Júnior
Senior Software & Solutions Architect

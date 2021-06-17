# URL Shortener

O URL Shortener é uma API para craiação de URLs curtas. Com essa API, o usuário pode realizar seu cadastro e login para utilizá-la. Com o login realizado, o usuário tem a possibilidade de adicionar uma URL na qual ele quer gerar uma URL mais curta. Ambos os endereços, tanto o original quanto o encurtado, são salvos no banco de dados junto com a data de criação, com isso o usuário pode realizar a requisição de busca por todas as URLs que ele já cadastrou.

## Como utilizar

- Precisa do Nodejs instalado
- No diretório do projeto, execute o comando abaixo para instalar todas as dependências

```shell
npm install
```

ou

```shell
yarn
```

- Informe as variáveis de ambiente no arquivo .env na raiz do projeto.
- Execute o comando abaixo para iniciar o servidor

```shell
npm start
```

ou

```shell
yarn start
```

## Banco de dados

O banco de dados utilizado foi o MongoDB, o model do usuário criado tem o formato a seguir:

```json
{
  "_id": "any_id",
  "name": "Any Name",
  "email": "any_email@email.com",
  "password": "any_password",
  "urls": [
    {
      "original_url": "https://originalurl.com",
      "shorted_url": "https://shortedurl.com",
      "created_at": "any_date"
    }
  ],
  "created_at": "any_date",
  "updated_at": "any_date"
}
```

## Variáveis de ambiente

Nesta API são utilizadas algumas variáveis de ambiente:

```shell
MONGO_DB_USER=username_mongodb
MONGO_DB_PASSWORD=password_mongodb

BASE_URL=base_url_of_application
TOKEN_SECRET=token_secret
```

## Rotas

### Cadastro

```shell
/signup POST
```

Essa rota recebe como requisição um JSON com os seguintes dados:

```json
{
  "name": "Any Name",
  "email": "any_email@email.com",
  "password": "any_password",
  "same_password": "any_password"
}
```
Como resposta são enviados para sucesso e erro:

- Se o cadastro for realizado com sucesso

`status 200`

```json
{
  "message": "Registration done successfully",
  "message_ptbr": "Cadastro realizado com sucesso"
}
```

- Se o email for inválido

`status 400`

```json
{ 
  "message": "Email with invalid format",
  "message_ptbr": "Email com formato inválido"
}
```

- Se o usuário já existe

`status 400`

```json
{ 
  "message": "User alredy exists",
  "message_ptbr": "Usuário já existe"
}
```

- Se as senhas não correspondem

`status 400`

```json
{ 
  "message": "Password not match",
  "message_ptbr": "As senhas precisam ser iguais"
}
```

- Se ocorre um erro no servidor

`status 500`

```json
{ 
  "message": "Server error",
  "message_ptbr": "Erro no servidor"
}
```

### Login

```shell
/login POST
```

Essa rota recebe como requisição um JSON com os seguintes dados:

```json
{
  "email": "any_email@email.com",
  "password": "any_password"
}
```
Como resposta são enviados para sucesso e erro:

- Se a requisição foi feita com sucesso

`status 200`

```json
{
  "token": "any_token"
}
```

- Se não houver nenhum usuário com aquelas credenciais

`status 400`

```json
{ 
  "message": "Invalid credentials",
  "message_ptbr": "Credenciais inválidas"
}
```

- Se a senha for inválida

`status 400`

```json
{ 
  "message": "Invalid credentials",
  "message_ptbr": "Credenciais inválidas"
}
```

- Se houver um erro no servidor

```json
{ 
  "message": "Server error",
  "message_ptbr": "Erro no servidor"
}
```

### Adicionar URL

```shell
/userurl POST
```

Essa rota recebe como requisição um JSON com os seguintes dados:

```json
{
  "url": "https://www.nucleodoconhecimento.com.br/administracao"
}
```
Como resposta são enviados para sucesso e erro:

- Se a URL foi cadastrada com sucesso

`status 200`

```json
{
  "message": "URL registred",
  "message_ptbr": "URL cadastrada"
}
```

- Se o usuário não tem autorização

`status 401`

```json
{
  "message": "Unauthorized",
  "message_ptbr": "Sem autorização"
}
```

- Se ocorre um erro no servidor

`status 500`

```json
{ 
  "message": "Server error",
  "message_ptbr": "Erro no servidor"
}
```

### Buscar todas as URLs cadastradas

```shell
/userurl GET
```

Como é um método GET, não é enviado nenhum corpo na requisição.

Como resposta são enviados para sucesso e erro:

- Se o usuário tiver duas URLs cadastradas

`status 200`

```json
[
  {
    "_id": "any_id",
    "original_url": "https://any_site.com",
    "shorted_url": "https://shorted_site.com",
    "created_at": "any_date"
  },
  {
    "_id": "any_id",
    "original_url": "https://any_site.com",
    "shorted_url": "https://shorted_site.com",
    "created_at": "any_date"
  }
]
```

- Se o usuário não tem autorização

`status 401`

```json
{
  "message": "Unauthorized",
  "message_ptbr": "Sem autorização"
}
```

- Se ocorrer um erro no servidor

`status 500`

```json
{ 
  "message": "Server error",
  "message_ptbr": "Erro no servidor"
}
```

### Checar se usuário está autenticado

```shell
/auth POST
```

Essa rota precisa que no header da requisição seja enviado um Bearer token.

Como resposta são enviados para sucesso e erro:

- Se o usuário estiver autorizado

`status 200`

```json
{
  "isAuth": true,
  "message": "Authorized",
  "message_ptbr": "Autorizado"
}
```

- Se o usuário não estiver autorizado

`status 401`

```json
{
  "isAuth": false,
  "message": "Unauthorized",
  "message_ptbr": "Sem autorização"
}
```

- Se houver um erro no servidor

`status 500`

```json
{ 
  "message": "Server error",
  "message_ptbr": "Erro no servidor"
}
```

### Redirecionar o usuário para o site

```shell
/custom/:code GET
```

Essa rota recebe um parametro chamado 'code', essa URL é usada para buscar no banco de dados se existe algum usuário com essa URL, que é a URL curta, se existir, o usuário é redirecionado para a URL original correspondente.

- Se o site não existir

```json
{ 
  "message": "Site not found",
  "message_ptbr": "Site não encontrado"
}
```

# URL Shortener

O URL Shortener é uma API para craiação de URLs curtas. Com essa API, o usuário pode realizar seu cadastro e login para utilizá-la. Com o login realizado, o usuário tem a possibilidade de adicionar uma URL na qual ele quer gerar uma URL mais curta. Ambos os endereços, tanto o original quanto o encurtado, são salvos no banco de dados junto com a data de criação, com isso o usuário pode realizar a requisição de busca por todas as URLs que ele já cadastrou.

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

```json
{
  "message": "Registration done successfully",
  "message_ptbr": "Cadastro realizado com sucesso"
}
```

ou

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

```json
{
  "token": "any_token"
}
```

ou

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

```json
{
  "message": "URL registred",
  "message_ptbr": "URL cadastrada"
}
```

ou

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

Se o usuário tiver duas URLs cadastradas

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

ou

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

```json
{
  "isAuth": true,
  "message": "Authorized",
  "message_ptbr": "Autorizado"
}
```

- Se o usuário não estiver autorizado

```json
{
  "isAuth": false,
  "message": "Unauthorized",
  "message_ptbr": "Sem autorização"
}
```

- Se houver um erro na requisição

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

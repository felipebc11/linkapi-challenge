# linkapi-challenge

## Instalação

### Sem utilização do Docker:

Para começar, execute o comando abaixo, assim instalando as depedências necessárias no seu ambiente de execução.

```sh
$ yarn install
```

## Principais comandos

```sh
$ yarn start:dev
```

### Utilizando o Docker:

Para começar, execute o comando abaixo, assim instalando as depedências necessárias no seu ambiente de execução.

```sh
$ docker-compose up
```

## Pré-requisitos

Configure os arquivos presentes na pasta src/config para poder executar a aplicação.

## Utilização

Execute uma requisição do tipo POST para: `http://localhost:8080/user/signup`
Para registar um novo usuário e envie um JSON semelhante a:

```json
{
  "email": "felipe@gmail.com",
  "password": "pass1234"
}
```

Execute uma requisição do tipo POST para: `http://localhost:8080/user/login`
Para realizar o login preencha o mesmo campos e envie um JSON semelhante a:

```json
{
  "email": "felipe@gmail.com",
  "password": "pass1234"
}
```

Um token deve ser retornado em caso de sucesso.

Para buscar os relatórios diários dos pedidos inseridos no sistema Bling, execute uma requisição do tipo GET para: `http://localhost:8080/report`

Lembre-se de utilizar o token obtido na rota de login:

```json
{
  "authorization": "Bearer token"
}
```

## Licença

MIT © [Felipe Bastos](https://github.com/felipebc11)

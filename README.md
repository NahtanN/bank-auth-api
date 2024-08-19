# Disclaimer

Inicialmente pensei em desenvolver os microserviços de maneira independente, não foi pensado como um monorepo.

# Estrutura dos bancos de dados

## Auth API database

[Auth API database](./readme_assets/Bank_auth.png)

## User API database

[User API database](./readme_assets/Bank_user.png)

## Transaction API database

[Transaction API database](./readme_assets/Bank_transaction.png)

- Em cada API, foi implementada o padrão outbox para garantir a consistência entre os bancos de dados.

# Arquitetura

Tentei seguir o padrão de arquitetura DDD. Acredito que poderia ter sido melhor implementada, mas ficou da seguinte forma:

- **Domain**: Contém as entidades, objetos de valor, agregados e eventos de domínio.
- **Application**: Contém os casos de uso da aplicação. Tudo relacionado ou Nestjs, como os controladores, módulos, middlewares, etc.
- **Infrastructure**: Contém as implementações dos repositórios, serviços externos e eventos.

# Como rodar

Existem duas formas de rodar a aplicação:

1. Caso queira rodar a aplicação de forma "manual", você primeiro precisa subir o docker compose localizado no diretorio `orchestration`, depois seguir para o diretorio `local` e rodar o comando `docker-compose up -d`. Depois, você pode rodar cada API individualmente com o comando `npm run start:dev` no diretório de cada API. Não se preocupe com as migrations, elas são executadas quando rodar o comando `npm run start:dev`.
2. Tambem no diretório `orchestration`, mas dentro do `dev`, ou rodar o comando `docker-compose up -d` você vai subir todos os serviços necessários, incluindo as apis.

Atraves do Kong, tudo fica dispovível em `http://localhost:8004`.

- Auth API: `http://localhost:8004/auth`
- User API: `http://localhost:8004/user`
- Transaction API: `http://localhost:8004/transaction`

OBS: para a rota de `POST /user/profile-picture`, na `user-api` ou no docker compose em `dev`, é necessário adicionar as credencias de acesso ao serviço da AWS. Não implementei storage local.

No diretorio `dev` existe um arquivo `postman.json` com as rotas para testar a aplicação. Mas para consultar atraves do Swagger, basta acessar:

- Auth API: `http://localhost:4001/docs`
- User API: `http://localhost:4002/docs`
- Transaction API: `http://localhost:4003/docs`

# Testes

O serviçios não estão completos com testes, mas na `auth-api` e `transaction-api`, na camada domain existem alguns testes unitários que servem como exemplo.

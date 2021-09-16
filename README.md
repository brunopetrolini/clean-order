# Clean Order

## :warning: Requisitos

Abaixo segue algum recursos necessários para que o projeto seja executado:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)

## Configurando a execução do projeto

Com os requisitos instalados em sua máquina vamos iniciar o setup do projeto

### Clonando o repositório

Para baixar o projeto em sua máquina e deixa-lo a ponto de execução é muito simples, basta seguir os passos abaixo:

```bash
# Em uma pasta de sua preferência execute para baixar o projeto
$ git clone https://github.com/brunopetrolini/clean-order.git
```

Após efetuar o clone do projeto vamos instalar suas dependências

```bash
# Entrando no diretório do projeto
$ cd clean-order

# Instalando as dependências com Yarn
$ yarn
```

Com o término da instalação o projeto estará quase pronto para ser executado.

### Instalando o Postgres com Docker

O projeto está configurado para utilizar o postgres a partir de um container, por isso vamos agr criar esse container:

```bash
# Iniciando um container Docker com postgres
$ docker run --name clean-postgres -e POSTGRES_PASSWORD=123456 -d postgres
```

Agora vamos configurar o postgres presente dentro do container

```bash
# Acessando o shell do container
$ docker container exec -it clean-postgres bash

# Acessando a CLI do postgres
$ psql -U postgres

# Criando o database
$ CREATE DATABASE app;

# Saindo da CLI do postgres
$ \q

# Saindo o shell do container
$ exit
```

Com o container instalado, basta acessar esse banco de dados com o editor SQL de sua preferência e executar o script [create.sql](./database/create.sql) presente no projeto.


## Installation

```bash
$ yarn install

$ cp .env.default .env

$ docker exec -it deployme /bin/bash
# run in docker
$ ts-node ./node_modules/.bin/typeorm migration:run
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Migrations

```bash
# new migration
ts-node ./node_modules/.bin/typeorm migration:generate -- -n migrations/migrationNameHere
#or 
ts-node ./node_modules/.bin/typeorm migrations:generate -n migrations/migrationNameHere
ts-node ./node_modules/.bin/typeorm migrations:create -n migrations/migrationNameHere

# run migrations
yarn run typeorm migration:run

# new Entity
yarn run typeorm entity:create -n User

#sync
ts-node ./node_modules/.bin/typeorm schema:sync
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).

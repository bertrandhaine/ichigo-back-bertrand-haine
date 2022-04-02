# Ichigo Back
This project was developped for this test : https://tokyotreat.atlassian.net/wiki/external/1591050551/NjZmMmNlOTVlNGU1NDA5MjhhMjRhNWIxNjYyZjlhOWY

## Required stack
```
- node: >= 14
- yarn
```

## Architecture

In this project, we use the minimal back template that I use for every project.
There is not a lot of dependencies, only a few that guarantees some major features.

### List of dependencies

- `joi`: Help us validate data schemes, useful for routes
- `pino`: Gives us a minimalistic way of logging, useful for when deploying on server
- `jsondata`: Instead of using a database, I chose to use filestorage in json. If we switch to db, only the `repository` file will be affected
- `cors`: Not useful in this project, but the middleware is still present in case we want to handle cors 

### Folders

```
src
├── api             all endpoints are here
├── core            the miminum needed files to have a well organised, nodejs back (middlewares, helpers...)
├── entities        where we store storage entities
├── index.ts        entrypoint
├── loader          the folder responsible for starting the project
├── repositories    accessing data in storage
└── utils           utils functions
```

## Start the project

- Either start with `yarn dev` 
- or first build the project with `yarn build` then `yarn start`

The project will be started on port `8082`. If you want to change the port, in your terminal : `PORT=1337 yarn dev`.

In the default config, the endpoints will be available at this path : 

```
GET http://localhost:8082/api/users/2/rewards
PATCH http://localhost:8082/api/users/1/rewards/2020-02-19T20:10:03Z/redeem
```

## Collection
`api_collection.json` in the root of the folder can be importer in a REST client like `insomnia` (or should also work with `postman`).
You'll have all the endpoints already available.

## Database
Instead of using database, we use a storage database. The `data` folder at the root will contain a json file representing the storage.
The `rewards.json` will be created when first endpoint will be called.

## Tests
`yarn test` should executes all the tests of the project. We use another `tests/data/rewards.json` folder for tests.
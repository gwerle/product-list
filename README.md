# products-list

## How to run

### Requirements

To run the application you will need:
* [Git](https://git-scm.com)
* [Node](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [npm](https://npmjs.com/)

### install json-server
```bash
# Install json-server globally
$ npm install -g json-server

```
### run json-server
```bash
#install the dependencies
$ yarn

# in the ./ of the project
$ json-server --watch Products.json --port 3333 --id productId

# in another terminal, run the application with:
$ yarn start
```

To run the unit tests:
```bash
$ yarn test
```
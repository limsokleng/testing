# Express Example

This repository demonstrates the usage of Sequelize within an [Express](https://expressjs.com) application.
The implemented logic is a simple task tracking tool.


## Starting App

**Without Migrations**

```
npm install
npm start
``
**With Migrations**

```
npm install
node_modules/.bin/sequelize db:migrate
npm start
```

This will start the application and create an sqlite database in your app dir.
Just open [http://localhost:3000](http://localhost:3000).

## Running Tests

We have added some [Mocha](https://mochajs.org) based test. You can run them by `npm test`

## Running end2end

An environment variable has been added to set allow end 2 end testing to be ran again any endpoint.

| variable | default|
|-|-|
|ENDPOINT|http://localhost:3000|
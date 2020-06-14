'use strict';

var expect = require('expect.js');

describe('models/task', function () {
  before(function () {
      return require('../../models').sequelize.sync();
  });

  beforeEach(function () {
    this.Users = require('../../models').Users;
    this.Tasks = require('../../models').Tasks;
  });

  describe('create', function () {
    it('creates a task', function () {
      return this.Users.create({ username: 'johndoe' }).bind(this).then(function (user) {
        return this.Tasks.create({ title: 'a title', UserId: user.id }).then(function (task) {
          expect(task.title).to.equal('a title');
        });
      });
    });
  });
});

const { herbarium } = require('@herbsjs/herbarium');
const { Repository } = require('@herbsjs/herbs2knex');
const User = require('../../../domain/entities/user');
const connection = require('../database/connection');

class UserRepository extends Repository {
  constructor(injection) {
    super({
      entity: User,
      table: 'user',
      ids: ['id'],
      knex: connection,
    });
  }
}

module.exports = herbarium.repositories
  .add(UserRepository, 'UserRepository')
  .metadata({ entity: User }).repository;

exports.up = function (knex) {
  return knex.schema.createTable('user', function (table) {
    table.increments('id');
    table.string('name', 250).notNullable();
    table.string('nickname', 50).notNullable();
    table.string('password', 50).notNullable();
    table.string('email', 250).notNullable();
    table.string('city', 50);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};

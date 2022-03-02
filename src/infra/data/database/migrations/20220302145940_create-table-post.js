exports.up = function (knex) {
  return knex.schema.createTable('post', function (table) {
    table.increments('id');
    table.string('title', 250).notNullable();
    table.string('description', 500);
    table.integer('userId').notNullable();
    table.foreign('userId').references('user.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('post');
};

const { entity, id, field } = require('@herbsjs/herbs');
const { herbarium } = require('@herbsjs/herbarium');

const Post = entity('Post', {
  id: id(Number, {
    validation: {
      presence: true,
      numericality: {
        greaterThan: 0,
        onlyInteger: true,
      },
    },
  }),
  title: field(String, {
    validation: {
      presence: true,
      length: { maximum: 250 },
    },
  }),
  description: field(String, {
    validation: {
      length: { minimum: 3, maximum: 500 },
    },
  }),
  userId: id(Number, {
    validation: {
      presence: true,
    },
  }),
});

module.exports = herbarium.entities.add(Post, 'Post').entity;

const { entity, id, field } = require('@herbsjs/herbs');
const { herbarium } = require('@herbsjs/herbarium');

const User = entity('User', {
  id: id(Number, {
    validation: {
      numericality: {
        greaterThan: 0,
        onlyInteger: true,
      },
    },
  }),
  name: field(String, {
    validation: {
      presence: true,
      length: { maximum: 250 },
    },
  }),
  nickname: field(String, {
    validation: {
      presence: true,
      length: { minimum: 3, maximum: 50 },
    },
  }),
  password: field(String, {
    validation: {
      presence: true,
      length: { minimum: 4, maximum: 50 },
    },
  }),
  email: field(String, {
    presence: true,
    email: true,
    length: { minimum: 4, maximum: 250 },
  }),
  city: field(String, {
    validation: {
      length: { minimum: 4, maximum: 50 },
    },
  }),
});

module.exports = herbarium.entities.add(User, 'User').entity;

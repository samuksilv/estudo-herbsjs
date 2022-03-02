const { Ok, Err, step, usecase } = require('@herbsjs/herbs');
const { herbarium } = require('@herbsjs/herbarium');
const User = require('../../entities/user');

const dependency = {
  UserRepository: require('../../../infra/data/repositories/user-repository'),
};

const createUserUseCase = (injection) =>
  usecase('Create user', {
    request: {
      name: String,
      nickname: String,
      email: String,
      password: String,
      city: String,
    },

    response: User,

    setup: ctx => (ctx.di = Object.assign({}, dependency, injection)),

    authorize: async () => Ok(),

    // Step description and function
    'Check if the User is valid': step((ctx) => {
      // Creates a new user from the request.
      // And stores it in the context.
      ctx.user = User.fromJSON(ctx.req);

      // Check if the fields are valid.
      if (!ctx.user.isValid())
        return Err('User ', 'The User entity is invalid', ctx.user.errors);

      // returning Ok continues to the next step. Err stops the use case execution.
      return Ok(new User());
    }),

    'Save the User': step(async (ctx) => {
      // Insert the new user to the repository
      // and then return it to the client using
      // the `ret` property of context object.
      const repo = new ctx.di.UserRepository(injection)

      ctx.ret = await repo.insert(ctx.user);

      return ctx.ret;
    }),
  });

module.exports.createUser = herbarium.usecases
  .add(createUserUseCase, 'createUser')
  .metadata({
    group: 'User',
    operation: herbarium.crud.create,
    entity: User,
  }).usecase;

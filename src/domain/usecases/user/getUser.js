const { Ok, Err, step, usecase } = require('@herbsjs/herbs');
const { herbarium } = require('@herbsjs/herbarium');
const User = require('../../entities/user');

const dependency = {
  UserRepository: require('../../../infra/data/repositories/user-repository'),
};

const getUserUseCase = (injection) =>
  usecase('Get users', {
    request: {},
    response: [User],

    setup: (ctx) => (ctx.di = Object.assign({}, dependency, injection)),

    authorize: async () => Ok(),

    'Get users': step(async (ctx) => {
      // Insert the new user to the repository
      // and then return it to the client using
      // the `ret` property of context object.
      const repo = new ctx.di.UserRepository(injection);

      ctx.ret = await repo.findAll();

      console.log(ctx.ret);

      return ctx.ret;
    }),
  });

module.exports.createUser = herbarium.usecases
  .add(getUserUseCase, 'getUser')
  .metadata({
    group: 'User',
    operation: herbarium.crud.readAll,
    entity: User,
  }).usecase;

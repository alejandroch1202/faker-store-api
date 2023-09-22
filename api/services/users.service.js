const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const ROLES = ['admin', 'customer']

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 50;

    for (let i = 0; i < limit; i++) {
      const random = Math.floor(Math.random() * (2 - 1 + 1)) + 1
      this.users.push({
        id: i + 1,
        email: faker.internet.email().toLocaleLowerCase(),
        password: faker.internet.password().toLocaleLowerCase(),
        name: faker.name.fullName(),
        role: ROLES[random - 1],
        avatar: faker.image.imageUrl(640, 480, 'people', true),
        creationAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      });
    }
  }

  async create(data) {
    const newUser = {
      id: this.users.length + 1,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  async find() {
    return this.users;
  }

  async findOne(id) {
    const user = this.users.find((item) => item.id == id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    if (user.isBlock) {
      throw boom.conflict('User is blocked');
    }
    return user;
  }

  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id == id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    const user = this.users[index];
    this.users[index] = { ...user, ...changes };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id == id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = UsersService;

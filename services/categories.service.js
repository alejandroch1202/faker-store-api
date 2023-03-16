const { faker } = require('@faker-js/faker');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 50;

    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productAdjective(),
        image: faker.image.imageUrl(),
      });
    }
  }

  create(body) {
    const { name, image } = body;
    this.categories.push({
      id: faker.datatype.uuid(),
      name,
      image,
    });
  }

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find((item) => item.id === id);
  }

  update() {}

  delete(id) {
    return this.categories.pop(id);
  }
}

module.exports = CategoriesService;

const { faker } = require('@faker-js/faker');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
      });
    }
  }

  create(body) {
    const { name, price, image } = body;
    this.products.push({
      id: faker.datatype.uuid(),
      name,
      price,
      image,
    });
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find((item) => item.id === id);
  }

  update() {}

  delete(id) {
    return this.products.pop(id);
  }
}

module.exports = ProductsService;

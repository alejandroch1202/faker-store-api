const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const CATEGORIES = ['Clothes', 'Electronics', 'Furniture', 'Toys', 'Others']
const IMAGES = ['fashion', 'technics', 'business', 'sports', 'abstract']

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      const random = Math.floor(Math.random() * (5 - 1 + 1)) + 1
      this.products.push({
        id: i + 1,
        title: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        images: [
          faker.image.imageUrl(640, 480, IMAGES[random - 1], true),
          faker.image.imageUrl(640, 480, IMAGES[random - 1], true),
          faker.image.imageUrl(640, 480, IMAGES[random - 1], true),
        ],
        creationAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        category: {
          id: random,
          name: CATEGORIES[random - 1],
          image: faker.image.imageUrl(640, 480, IMAGES[random - 1], true),
          creationAt: faker.date.past(),
          updatedAt: faker.date.recent()
        }
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: this.products.length + 1,
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return this.products;
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id == id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id == id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = { ...product, ...changes };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id == id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;

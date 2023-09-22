const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const CATEGORIES = ['Clothes', 'Electronics', 'Furniture', 'Toys', 'Others']

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 5;

    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: i + 1,
        name: CATEGORIES[i],
        image: faker.image.imageUrl(),
        creationAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      });
    }
  }

  async create(data) {
    const newCategory = {
      id: this.categories.length + 1,
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async find() {
    return this.categories;
  }

  async findOne(id) {
    const category = this.categories.find((item) => item.id == id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    if (category.isBlock) {
      throw boom.conflict('Category is blocked');
    }
    return category;
  }

  async update(id, changes) {
    const index = this.categories.findIndex((item) => item.id == id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    const category = this.categories[index];
    this.categories[index] = { ...category, ...changes };
    return this.categories[index];
  }

  async delete(id) {
    const index = this.categories.findIndex((item) => item.id == id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }
}

module.exports = CategoriesService;

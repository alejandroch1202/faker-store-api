const express = require('express');
const CategoriesService = require('./../services/categories.service');

const router = express.Router();
const service = new CategoriesService();

// GET
router.get('/', async (req, res) => {
  const categories = await service.find();
  res.status(200).json(categories);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const category = await service.findOne(id);
  res.status(200).json(category);
});

// POST
router.post('/', async (req, res) => {
  const body = req.body;
  const newCategory = await service.create(body);
  res.status(201).json(newCategory);
});

// PATCH
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const category = await service.update(id, body);
  res.status(200).json({ category });
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await service.delete(id);
  res.status(200).json(response);
});

module.exports = router;

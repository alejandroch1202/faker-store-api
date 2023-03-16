const express = require('express');
const ProductsService = require('./../services/products.service');

const router = express.Router();
const service = new ProductsService();

// GET
router.get('/', (req, res) => {
  const products = service.find();

  res.status(200).json(products);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);

  res.status(200).json(product);
  // res.status(404).json({ msg: 'Product not found' });
});

// POST
router.post('/', (req, res) => {
  const body = req.body;
  service.create(body);

  res.status(201).json({ message: 'Successfully created' });
});

// PATCH
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.status(200).json({ message: 'Updated', id, body });
});

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  service.delete(id);
  res.status(201).json({ message: 'Deleted', id });
});

module.exports = router;

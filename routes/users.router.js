const express = require('express');
const UsersService = require('./../services/users.service');

const router = express.Router();
const service = new UsersService();

// GET
router.get('/', (req, res) => {
  const users = service.find();

  res.status(200).json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id);

  res.status(200).json(user);
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

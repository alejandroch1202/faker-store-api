const express = require('express');
const UsersService = require('./../services/users.service');

const router = express.Router();
const service = new UsersService();

// GET
router.get('/', async (req, res) => {
  const users = await service.find();
  res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await service.findOne(id);
  res.status(200).json(user);
});

// POST
router.post('/', async (req, res) => {
  const body = req.body;
  const newUser = await service.create(body);
  res.status(201).json(newUser);
});

// PATCH
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = await service.update(id, body);
  res.status(200).json({ user });
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await service.delete(id);
  res.status(200).json(response);
});

module.exports = router;

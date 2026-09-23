import express from 'express';
import db from '../models/index.cjs';
import verifyToken from '../middleware/verifyToken.js';
import requireRole from '../middleware/requireRole.js';

const router = express.Router();
const {Task, User} = db;

router.get('/tasks', async (req, res) => {
  const tasks = await Task.findAll({include:{model: User,attributes:{exclude: ['password']}},
    order: [['id', 'ASC']]
  });
  res.status(200).json(tasks);
});

router.get('/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id, {
    include: {model: User, attributes: {exclude: ['password']}}
  });
  if (!task){
    return res.status(404).json({error: 'Task not found'});
  }
  res.status(200).json(task);
});

router.get('/users', async (req, res) => {
  const users = await User.findAll({order: [['id', 'ASC']]});
  res.status(200).json(users);
});

router.post('/tasks', verifyToken, async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

router.put('/tasks/:id', verifyToken, async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task){
    return res.status(404).json({error: 'Task not found'});
  }
  await task.update(req.body);
  res.status(200).json(task);
});

router.delete('/tasks/:id', verifyToken, requireRole('admin'), async (req, res) => {
  const task = await Task.findByPk(req.params.id, {include: {model: User, attributes: {exclude: ['password']}}});
  if (!task){
    return res.status(404).json({error: 'Task not found'});
  }
  await task.destroy();
  res.status(200).json({message: 'Deleted', task});
});

export default router;
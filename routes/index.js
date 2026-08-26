import express from 'express';
import db from '../models/index.cjs';

const router = express.Router();
const {Task, User} = db;

router.get('/tasks', async (req, res) => {
  const tasks = await Task.findAll({include: User, order: [['id', 'ASC']]});
  res.status(200).json(tasks);
});

router.get('/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id, {include: User});
  if (!task){
    return res.status(404).json({error: 'Task not found'});
  }
  res.status(200).json(task);
});

router.get('/users', async (req, res) => {
  const users = await User.findAll({order: [['id', 'ASC']]});
  res.status(200).json(users);
});

router.post('/tasks', async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

router.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task){
    return res.status(404).json({error: 'Task not found'});
  }
  await task.update(req.body);
  res.status(200).json(task);
});

router.delete('/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({error: 'Task not found'});
  }
  await task.destroy();
  res.status(200).json({message: 'Deleted', task});
});

export default router;
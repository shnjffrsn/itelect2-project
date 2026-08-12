import express from 'express';
import {tasks, validateTask, mergeTaskUpdate} from '../src/utils.js';
import {fetchSampleUsers} from '../src/api.js';

const router = express.Router();

let cachedUsers = [];

(async () => {
  try{
    const rawUsers = await fetchSampleUsers();
    cachedUsers = rawUsers.map(user => ({id: user.id, name: user.name, email: user.email}));
    console.log('Sample users successfully fetched and cached.');

  }catch (error){
    console.error('Failed to fetch initial users:', error);
  }
})();

router.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

router.get('/tasks/:id', (req, res) => {
  const taskID = req.params.id;
  const task = tasks.find(t => t.id == taskID);

  if (!task){
    return res.status(404).json({error: 'Task not found'});
  }
  res.status(200).json(task);
});

router.get('/users', (req, res) => {
  res.status(200).json(cachedUsers);
});

let nextId = tasks.length + 1;

router.post('/tasks', (req, res) => {
  if (!validateTask(req.body)) {
    return res.status(400).json({error: 'Task title and details are needed!'});
  }
  const newTask = {id: nextId++, ...req.body, completed: false};
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1){
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks[index] = mergeTaskUpdate(tasks[index], req.body);
  res.status(200).json(tasks[index]);
});

router.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1){
    return res.status(404).json({ error: 'Task not found' });
  }

  const [removed] = tasks.splice(index, 1);
  res.status(200).json({ message: 'Deleted', task: removed });
});

export default router;
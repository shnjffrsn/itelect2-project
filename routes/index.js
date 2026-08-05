import express from 'express';
import {tasks} from '../src/utils.js';
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
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(200).json(task);
});

router.get('/users', (req, res) => {
  res.status(200).json(cachedUsers);
});

export default router;
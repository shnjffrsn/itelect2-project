import db from '../models/index.cjs';

const {Task, User} = db;

export async function listTasks(req, res){
  const tasks = await Task.findAll({
    include: {model: User, attributes: {exclude: ['password']}},
    order: [['id', 'ASC']]
  });
  res.status(200).json(tasks);
}

export async function getTask(req, res){
  const task = await Task.findByPk(req.params.id, {
    include: {model: User, attributes: {exclude: ['password']}}
  });
  if (!task){
    return res.status(404).json({error: 'Task not found'});
  }
  res.status(200).json(task);
}

export async function listUsers(req, res){
  const users = await User.findAll({order: [['id', 'ASC']]});
  res.status(200).json(users);
}

export async function createTask(req, res){
  const task = await Task.create(req.body);
  res.status(201).json(task);
}

export async function updateTask(req, res){
  const task = await Task.findByPk(req.params.id);
  if (!task){
    return res.status(404).json({error: 'Task not found'});
  }
  await task.update(req.body);
  res.status(200).json(task);
}

export async function deleteTask(req, res){
  const task = await Task.findByPk(req.params.id, {
    include: {model: User, attributes: {exclude: ['password']}}
  });
  if (!task){
    return res.status(404).json({error: 'Task not found'});
  }
  await task.destroy();
  res.status(200).json({message: 'Deleted', task});
}
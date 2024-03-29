const { sequelize, User, Post } = require('./models');
const express = require('express');

const app = express();

app.use(express.json());

//  to create something

app.post('/api/create', async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const user = await User.create({ name, email, role });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//  to fetch all the users

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(500).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

//  to fetch a single user

app.get('/api/users/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await User.findOne({
      where: { uuid },
      include: 'posts',
    });
    res.status(500).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//  fetch posts with the user informatiopn also:
app.get('/posts', async (req, res) => {
  const posts = await Post.findAll({ include: 'user' });
  res.status(200).json(posts);
});

// update a useer
app.put('/api/users/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;
    const { name, email, role } = req.body;
    const user = await User.findOne({
      where: { uuid },
    });

    user.name = name;
    user.email = email;
    user.role = role;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete('/api/users/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await User.findOne({
      where: { uuid },
    });

    await user.destroy();
    res.status(500).json({ msg: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen({ port: 4000 }, async () => {
  console.log('Server is up and running ');
  await sequelize.authenticate();
  console.log('Connected  with the database');
});

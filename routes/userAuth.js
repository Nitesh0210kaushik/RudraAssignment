const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel.js');
const router = express.Router();
const dotenv = require('dotenv')
dotenv.config({ path: '../config.env' })

const secret_key = process.env.JWT_SECRET_KEY || 'NITESHKAUSHIK!@#$%^&*';

router.post('/register', async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, email, password: hashedPassword });

        const result = await newUser.save();
        const user = result.toObject();

        console.log('User saved:');
        res.status(201).json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Username or password is incorrect' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Username or password is incorrect' });
        }

        const token = jwt.sign({ id: user._id }, secret_key, { expiresIn: '1h' });

        res.json({ token, userID: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.put('/edit/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;

        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/delete/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findByIdAndRemove(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/userlist', async(req, res) => {
    try {
        const users = await UserModel.find({});

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
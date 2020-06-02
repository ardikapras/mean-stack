const express = require('express');
const router = express.Router();
const User = require('../models/user');

async function getUser(req, res, next) {
    try {
        user = await User.findOne({ id: req.params.id })
        if (user == null) {
            return res.status(404).json({ message: 'Cant find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one user
router.get('/:id', getUser, async (req, res) => {
    res.json(res.user)
})

// Create one user
router.post('/', async (req, res) => {
    const user = new User({
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update one user
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.firstname != null) {
        res.user.firstname = req.body.firstname
    }
    if (req.body.lastname != null) {
        res.user.lastname = req.body.lastname
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }
    if (req.body.address != null) {
        res.user.address = req.body.address
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete one user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Deleted this user' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;
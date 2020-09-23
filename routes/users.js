const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

const config = require('config');

const { check, validationResult } = require('express-validator'); // Methods of e.v : A middleware

const User = require('../models/User')

// @route       POST api/users
// @desc        Register a user
// @access      Public 

router.post('/', [
    check("name", "Name is required").not().isEmpty(),
    check("email", 'Email is required').isEmail(),
    check('password', 'Password should be of more than 5 characters').isLength({ min: 6 })
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty())
        return res.status(400).json({ error: error.array() })

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email: email }); // express validator method
        if (user) {
            return res.status(400).json({ msg: "User already exists!" })
        }

        user = new User({
            name: name,
            email: email,
            password: password
        });

        const salt = await bcrypt.genSalt(10); // 10 rounds is default 

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })

    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error')

    }
});

module.exports = router;
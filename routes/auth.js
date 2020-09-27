const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');

const User = require('../models/User')

// @route       GET api/auth
// @desc        Get logged in user
// @access      Private 

router.get('/', auth, async (req, res) => { // the middleware auth makes api/auth a protected route

    try {
        const user = await User.findById(req.user.id).select('-password'); // findById is mongoose method
        res.json(user);                                                    // -password is used so that password isn't
    } catch (error) {                                                      // retrieved
        console.error(error.message);
        res.status(500).send({ msg: 'Internal Server Error' })
    }

});

// @route       POST api/auth
// @desc        Auth user and get token
// @access      Public  

router.post('/', [

    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if (!user)
            return res.status(400).json({ msg: 'Invalid Credentials' })

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(400).json({ msg: 'Invalid Credentials' })

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
    } catch (error) {

        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
});

module.exports = router
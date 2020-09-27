const express = require('express');
const { check, validationResult } = require('express-validator'); // Methods of e.v
const router = express.Router();
const auth = require('../middleware/auth')

const Contact = require('../models/Contact')

// @route       GET api/contacts
// @desc        Get all users contacts
// @access      Private 

router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 }) // Confusion?? user isfetched by it's id
        res.json(contacts);            // .find is mongoose method, date -1 sorts with recent contact as first.
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error')
    }
});

// @route       POST api/contacts
// @desc        Add new contact
// @access      Private 

router.post('/', [auth,
    [
        check('name', 'Name is required').not().isEmpty(),

    ]], async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty())
            return res.status(400).json({ error: error.array() })

        const { name, email, phone, type } = req.body;

        try {
            const newContact = new Contact({
                name: name,
                email,
                phone,
                type,
                user: req.user.id
            })

            const contact = await newContact.save();
            res.json(contact);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error')
        }

    });

// @route       PUT api/contacts/:id
// @desc        Update contact
// @access      Private 

router.put('/:id', (req, res) => {
    res.send('Update contact');
});

// @route       DELETE api/contacts/:id
// @desc        Delete contact
// @access      Private 

router.delete('/:id', (req, res) => {
    res.send('Delete contact');
});
module.exports = router;
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/User');
const bcrypt = require('bcrypt');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

router.post("/", async (req, res, next) => {
    try {
        let { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("Email already used.");

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        let salt = bcrypt.genSaltSync(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        await user.save();

        let token = user.generateToken();

        res.send(token);
    } catch (ex) {
        console.error(ex);
        next();
    }
});

router.delete("/delete-user/:id", async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send('Invalid user id.');
        res.send(user);
    } catch (ex) {
        console.error(ex);
        next();
    }
});

module.exports = router;
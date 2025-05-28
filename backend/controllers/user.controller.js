const express = require('express');
const { validationResult } = require('express-validator');
const userservice = require('../services/user.service');
const Usermodel = require('../models/usermodel');
const transactionservice = require('../services/Transactionservice');


module.exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const hashPassword = await Usermodel.hashPassword(password);

    const ifuserexists = await Usermodel.findOne({ email });
    if (ifuserexists) {
        return res.status(400).json({ error: 'User already exists' });
    }

    try {
        const user = await userservice.createUser({ name, email, password: hashPassword });
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = (await Usermodel.find({ email }).select('+password').limit(1))[0];
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.createTransaction = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name_transaction, amount, date, type, category, description, source } = req.body;

    try {
        const transaction = await transactionservice.createTransaction({
            name_transaction,
            amount,
            date,
            type,
            category,
            description,
            source
        });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




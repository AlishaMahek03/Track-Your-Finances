const transactionmodel = require('../models/Transactionsmodel');
const mongoose = require('mongoose');

module.exports.createTransaction = async ({ name_transaction, amount, date, type, category, description, source, user }) => {
    if (!name_transaction || !amount || !category) {
        throw new Error('Name, amount, and category are required fields');
    }

    if (typeof amount !== 'number' || amount < 0) {
        throw new Error('Amount must be a positive number');
    }

    const transaction = new transactionmodel({
        name_transaction,
        amount,
        date: date ? new Date(date) : new Date(),
        type,
        category,
        description,
        source,
        user
    });

    return await transaction.save();
}


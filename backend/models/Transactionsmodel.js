const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    name_transaction: {
        type: String,
        required: true,
        trim: true
    }, 
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum: ['income', 'expense']
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    source:{
        type: String,
        trim: true
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
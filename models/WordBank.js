//created collection and exported to server.js file

const mongoose = require('mongoose')

const wordBankSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
   
})

module.exports = mongoose.model('WordBank', wordBankSchema);
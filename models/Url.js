const mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Url', UrlSchema);
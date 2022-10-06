const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TestDB', { autoIndex: false })

module.exports = mongoose;
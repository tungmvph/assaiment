const mongoose = require('mongoose');

const userSchama = new mongoose.Schema({
    Email: {
        type: String,
        
    },
    Pas: {
        type: String,
 
    },
    Name: {
        type: String,
        required: true
        
    },

    Hinhanh : {
        type : String
    }

});

const UsModale = new mongoose.model('sp', UsModale);

module.exports = UsModale;
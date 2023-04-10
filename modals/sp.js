const mongoose = require('mongoose');

const spSchama = new mongoose.Schema({
    Masp: {
        type: String,
        
    },
    Name: {
        type: String,
        required: true
    },
    Gia: {
        type: Number,
        
    },

    Hinhanh : {
        type : String
    }
    ,
    Mausac : {
        type : String
    }
    ,
    Loai : {
        type : String
    }
    ,
    Makh : {
        type : String
    }
    ,
    Tenkh : {
        type : String
    }
    
    

});

const SpModale = new mongoose.model('sp', spSchama);

module.exports = SpModale;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minlength : [6,"Username must be at least 6 characters long"],
    },
    
    email :{
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        minlength : [10,"Email must be at least 10 characters long"],
    },

    password :{
        type: String,
        required : true,
        minlength : [8,"Password must be at least 8 characters long"],
    }
})

const user = mongoose.model('User',userSchema);
module.exports = user;
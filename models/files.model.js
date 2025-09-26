const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename :{
        type : String,
        required : true
    },
    path :{
        type :String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    }
})

const File = mongoose.model('files',fileSchema);
module.exports = File;
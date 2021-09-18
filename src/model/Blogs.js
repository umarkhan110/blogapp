const mongoose = require('mongoose');

const blog = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    author:{
        type:String,
        required:true
    },
    btitle:{
        type:String,
        required:true
    },
    bcontent:{
        type:String,
        required:true
    }
});


const Blogs = new mongoose.model('Blogs', blog);
module.exports = Blogs;

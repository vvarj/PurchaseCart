const mongoose=require('mongoose');

const studentSchema=new mongoose.Schema({
    name:String,
    qty:Number,
    image:String,
    price:Number
})


module.exports=mongoose.model('cartRecord',studentSchema);
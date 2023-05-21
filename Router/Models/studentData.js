const mongoose=require('mongoose');
const {Schema}=mongoose;
const studentData =new Schema({
  name:{
          type:String,
          required:true
  },
  roll:{
           type:String,
           required:true  
},
  course:{
          type:String,
          required:true
  },
  dateOfAdmission:{
          type:Date,
          required:true,
          default:Date.now
  }
});
console.log("DB set scussesfully");
module.exports=mongoose.model('studentInfo',studentData);

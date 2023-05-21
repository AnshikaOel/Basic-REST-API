const express=require('express');
const router=express.Router();
const Student =require('./Models/studentData');

// getting all
router.get('/',async (req,res)=>{ 
    console.log('getting all data');
    const posts=await Student.find({});
    res.send(posts);  
});

// getting one 
router.get('/:id',getStudent,(req,res)=>
{
    res.json(res.student);
});

// creating one
router.post('/',async (req,res)=>{
    const student=new Student({
        name:req.body.name,
        roll:req.body.roll,
        course:req.body.course,
    });
    try{
        const newStudent=await student.save();
        res.status(201).json(newStudent);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

// updating one
router.patch('/:id',getStudent,async(req,res)=>{
   if(req.body.name!=null)
   {
    res.student.name=req.body.name
   }
   if(req.body.roll!=null)
   {
      res.student.roll=req.body.roll
   }
   if(req.body.course!=null)
   {
      res.student.course=req.body.course
   }
   try{
    const updatedStudent=await res.student.save();
    res.json(updatedStudent);
   }
   catch(err){
    res.status(400).json({message:err.message});
   }
});

//  deleteing one 
router.delete('/:id',getStudent,async(req,res)=>{
    try{
        await res.student.deleteOne()
        res.json({message:'Deleted Subscriber'});
    }catch(err)
    {
        res.status(500).json({message:err.message});
    }
});

async function getStudent(req,res,next){
    let student;
    try{
        student=await Student.findById(req.params.id);
        if(student == null)
        {
            return res.status(404).json({message:'cannot find subscriber'})
        }
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }

    res.student=student;
    next();
}

module.exports=router;

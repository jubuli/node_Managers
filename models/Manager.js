 const mongoose=require('mongoose')

 //define the manager schema
   const ManagerSchema=new mongoose.Schema({
    name:{ type:String ,required:true },
    age:{ type:Number },
    work:{ type:String ,enum:['chef','waiter','manager'],required:true  },
    mobile:{ type:String ,required:true },
    email:{ type:String ,required:true,unique:true },
    address:{ type:String },
    salary:{ type:Number ,required:true,}

   })
   //cretae Manager model
   const Manager=mongoose.model('Manager',ManagerSchema);
   module.exports=Manager
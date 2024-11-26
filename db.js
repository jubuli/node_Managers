const  mongoose=require("mongoose")

//define the mongoose connetion url
const mongooseURL='mongodb://localhost:27017/mydb'
  //set up mongoodb connection
  mongoose.connect(mongooseURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  //get the default connenction
  //mongoose maintains a default connection object representing the mongooDB connection
  //mongogoodb and node js brige
  const db=mongoose.connection;
  //define event listenner for database connection
  db.on('connected',()=>{
    console.log('connected to mongodb server')
  })

  db.on('error',(err)=>{
    console.log('mongooDb connection error',err)
  })
  
  db.on('disconnected',()=>{
    console.log('mongooDb   disconnection ')
  })

  module.exports=db;
  
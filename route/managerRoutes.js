const express = require('express')
const router = express.Router();
const Manager = require('./../models/Manager')

//post Route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body//assuming the request body contain the manager data
        const newManager = new Manager(data)
        //save the new person to the database
        const response = await newManager.save();
        console.log('datasaved', response)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal Server Error' });
    }
})

//get method to get Manager
router.get('/', async (req, res) => {
    try {
        const data = await Manager.find();
        console.log('data Fetched')
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal Server Error' });
    }
})
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;//extract the work type from the url parameter
        if (workType == "chef" || workType == "manager" || workType == "waiter") {
            const response = await Manager.find({ work: workType })
            console.log('response fetched')
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'invalid work Type' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal Server Error' });
    }
})
//update 
router.put('/:id', async (req, res) => {
    try {
          
        const ManagerId = req.params.id  //extract the id from url parameter
        const updateManagerData = req.body//update data for the manager
        const response = await Manager.findByIdAndUpdate(ManagerId, updateManagerData,{
           new:true,// return the updated document
              runValidators:true//run mongoose Validation
        })
        if(!response){
            return res.status(404).json({error:'person not found'})
        }
           console.log('data updated');
           res.status(200).json(response)
        }catch (err) {
            console.log(err)
            res.status(500).json({ error: 'internal Server Error' });

        }
})
//delete 
router.delete('/:id', async (req, res) => {
    try {
        const ManagerId = req.params.id  // Extract the manager id from the URL parameter
        
        // Assuming you have a Manager Model
        const response = await Manager.findByIdAndDelete(ManagerId)

        if (!response) {
            return res.status(404).json({ error: 'Person not found' })  // Return 404 if not found
        }

        console.log('Data deleted');
        res.status(200).json({ message: 'Manager deleted successfully', data: response })  // Optional message
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


module.exports = router;
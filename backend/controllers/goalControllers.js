const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

const getGoals= asyncHandler( async (req,res)=>{
  const goals = await Goal.find({user:req.user.id})
  res.status(200).json(goals)
})

const setGoals =asyncHandler( async (req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user:req.user.id
    })

    res.status(200).json(goal)
})

const updateGoal = asyncHandler(  async (req,res)=>{
const goal = await Goal.findById(req.params.id)


if(!goal){
  res.status(400)
  throw new Error('goal not found')
}
const user = await User.findById(req.user.id)

//check for user
if(!user){
   res.status(401)
   throw new Error('user not found')
}

//make sure user == goal user

if(goal.user.toString() == user.id){
  res.status(401)
  throw new Error('user not authorised')
}
const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,
req.body,
   {
     new: true,
   } 
    )

    res.json(updatedGoal)
})

const deleteGoal = asyncHandler(  async (req,res)=>{
 
    const goal = await Goal.findById(req.params.id)

    if(!goal){
      res.status(400)
      throw new Error('goal not found')
    }

    const user = await User.findById(req.user.id)

//check for user
if(!user){
   res.status(401)
   throw new Error('user not found')
}

//make sure user == goal user

if(goal.user.toString() == user.id){
  res.status(401)
  throw new Error('user not authorised')
} 

    await goal.remove()
    res.status(200).json({id: req.params.id})
    
})


//exports
module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal,
}
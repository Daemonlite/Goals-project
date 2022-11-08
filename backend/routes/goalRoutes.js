const express = require('express')
const router= express.Router()
const {getGoals, setGoals,updateGoal,deleteGoal,} = require('../controllers/goalControllers')

const {protect} = require('../middlewares/authMiddleWare')


router.get('/',protect,getGoals)
router.post('/',protect,setGoals)
router.put('/:id',protect,updateGoal)
router.delete('/:id',protect,deleteGoal)

module.exports = router







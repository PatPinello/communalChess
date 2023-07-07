const userModel = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

//get all users
const getAllUsers = async (req,res) =>  {
    
    
    const users = await userModel.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}

//login user
const loginUser = async(req, res)=>{
    const {email, password} = req.body
    try{
        const user = await userModel.login(email,password)
        const token = createToken(user._id)
        const userID = user._id
        
        res.status(200).json({email, token, userID})
    }catch(error){
        res.status(400).json({error: error.message})
    }
    
}
//signup user
const signupUser = async(req, res)=>{
    const {email, password} = req.body
    try{
        const user = await userModel.signup(email,password)
        const token = createToken(user._id)
        
        
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
    
}



//get a single user
const getUser = async (req,res) =>  {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'No User'})


    const user = await userModel.findById(id)
    
    if (!user) return res.status(404).json({error:"No User Found"})
    res.status(200).json({user})
}
//create user
const createUser = async(req,res) => {
    const {email,password,numVotes,voted,currentColor,user_id} = req.body
    
    try {
        
        const user = await userModel.create({email,password,numVotes,voted,currentColor,user_id})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
//delete user
const deleteUser = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'No User'})


    const user = await userModel.findOneAndDelete({_id: id})
    
    if (!user) return res.status(404).json({error:"No User Found"})
    res.status(200).json({user})
}

//update user
const updateUser = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: 'No User'})


    const user = await userModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    
    if (!user) return res.status(404).json({error:"No User Found"})
    res.status(200).json({user})
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    signupUser,
    loginUser
}
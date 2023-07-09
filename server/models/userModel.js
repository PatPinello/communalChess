const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const validator = require('validator')
const color = ["black","white"]

//Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unqiue: true
    },
    password: {
        type: String,
        required: true
    },
    numVotes: {
        type: Number,
        required: true,
        default: 0
    },
    voted: {
        type: Boolean,
        required: true,
        default: false
    },
    currentColor: {
        type: String,
        required: true,
        default: color[Math.round((Math.random()))]
    },
    moveVotedFor: {
        type: String,
        required: true,
        default: null
    }
}, { timestamps: true })

// signup method
userSchema.statics.signup = async function(email,password) {
    //validation
    if(!email || !password)
        throw Error("All fields must be filled")
    if(!validator.isEmail(email))
        throw Error("Not valid email")
    if(!validator.isStrongPassword(password))
        throw Error("Password must have uppercase, a symbol, and a length of at least 6")
    //check if email exits
    const exists = await this.findOne({ email })

    if(exists) throw Error('Email already in use')

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({ email, password: hash })

    return user
}

//login method
userSchema.statics.login = async function(email, password) {
    if(!email || !password)
        throw Error("All fields must be filled")
    
    const user = await this.findOne({ email })
    
    if(!user) throw Error('Incorrect Email')

    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch) throw Error('Incorrect Password')
    return user
}

//model
module.exports = mongoose.model('user', userSchema)


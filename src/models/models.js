const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./tasks')
const userSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('email is invalid')
            }
        }
    },
    password: {
        type:String,
        required: true,
        trim: true,
        minlength:7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
              throw new Error('password cannot contain password')
          }
      }
    },
    age: {
        type: Number,
        default:0,
        validate(value) {
            if (value < 0) {
                 throw new Error('please provide a valid age')
             }
         }
    },
    tokens: [{
        token: {
            type: String,
            required:true
        }
    }],
    avatar: {
        type:Buffer
    }
}, {
    timestamps:true
})

userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField:'owner'
})

userSchema.methods.genAuthToken = async function () {
    const user = this
    const token = await jwt.sign({ _id: user._id.toString() }, `${process.env.JWT_SECRET_KEY}`)
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
    
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.tokens
    delete userObj.avatar
    
    return userObj
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) { throw new Error('unable to login') }
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) { throw new Error('unable to login') }
    
    return user
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password =await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User
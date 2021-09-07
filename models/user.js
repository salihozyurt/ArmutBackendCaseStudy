const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    blocked: [String]
})

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username })

    if (user) {
        const auth = password === decrypt(user.password)
        if (auth) {
            return user
        } else {
            throw Error('Invalid Password')
        }
    } else {
        throw Error('User Not Found')
    }
}

userSchema.pre('save', function (next) {
    this.password = crypt(this.password)
    next()
})

const crypt = (value) => {
    const cryptVal = []
    const valLen = value.length
    value.split('').forEach((letter) => {
      cryptVal.push(String.fromCharCode((letter.charCodeAt(0) + valLen)))
    })
    return cryptVal.join('')
}

const decrypt = (value) => {
    const cryptVal = []
    const valLen = value.length
    value.split('').forEach((letter) => {
      cryptVal.push(String.fromCharCode((letter.charCodeAt(0) - valLen)))
    })
    return cryptVal.join('')
}

const User = mongoose.model('User', userSchema)
module.exports = User
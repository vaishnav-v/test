const mongoose = require('mongoose')
var url = 'mongodb+srv://vav:vav@cluster0.skmwmfr.mongodb.net/login?retryWrites=true&w=majority'

mongoose.connect(url).
    catch(err => {
        console.log(err)
    })

const db = mongoose.connection
db.on('error', console.log.bind(console, "error")) //database connection
db.once('open', (x) => {
    console.log("connection successful");
})

//login
const loginSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    role: {
        type: 'string',
    }
})
const studentSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: true
    },
    age: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    phone: {
        type: 'string',
        required: true
    },
    
})

const loginCollection = mongoose.model('details', loginSchema)
const studentCollection = mongoose.model('students', studentSchema)
 //collection and schema
module.exports.loginCollection = loginCollection
module.exports.studentCollection = studentCollection
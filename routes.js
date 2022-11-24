var express = require('express')
const router = express.Router()
var session = require('express-session')

const {loginCollection} = require('./db')
const {studentCollection} = require('./db')

router.get('/', (req, res) => {
    res.send("welcome to express")
})

router.post('/login', (req, res) => {
    const body = req.body
    loginCollection.findOne(body, function (err, data) {
        if (err) {
            res.status(404).send("error login")
        }
        else if(data) (
            res.json({"msg":"success"})
        )
        else{
            res.json({"msg":"Fail"})
        }
    })
})
router.post('/signup', (req, res) => {
    const body = req.body
    req.session.role="teacher"
    loginCollection.create(body, function (err, data) {
        if (err) {
            res.status(404).send("error login")
        }
        else (
            res.json({"msg":"success"})
        )
    })
})
router.get('/users', (req, res) => {
    studentCollection.find()
    .then((users) => {
        var users = users.map((user) => ({
            id: user._id,
            username: user.username,
            email: user.email,
            age: user.age,
            phone: user.phone,
        }))
        res.json(users)
    })
    .catch(
        (err)=>{res.send(err)}
    )
})
router.get('/users/:id', async (req, res) => {
    const userId = req.params.id
    console.log(userId)
    studentCollection.findById(userId, (err, data) => {
        if (err) {
            res.status(504).send(err)
        }
        else {
            res.json(data)
            console.log(data);
        }
    })
})
router.post('/add', (req, res) => {
    const body = req.body
    console.log(body)
    studentCollection.create(body, function (err, data) {
        if (err) {
            res.status(404).send("error login")
        }
        else {
            res.json(data)
            console.log(data);
        }
    })
})
router.post('/update', (req, res) => {
    const body = req.body
    studentCollection.updateMany({username:body.username},body, function (err, data) {
        if (err) {
            res.status(404).send("error update")
        }
        else { res.json({"msg": "success"})}
          
    })
})
router.post('/delete', (req, res) => {
    const body = req.body
    console.log(body)

    studentCollection.deleteOne({username:body.username}, function (err, data) {
        if (err) {
            res.status(404).send("error update")
            console.log(err);
        }
        else { res.json(data)
            console.log(data);}
    }) 
})

module.exports = router
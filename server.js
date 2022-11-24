var express = require('express')
var { urlencoded } = require("body-parser")
const path = require('path')

const app = express()
const routes = require("./routes")
const session = require('express-session')


app.use(express.static('views'))
app.use(express.json())
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
)
app.use(urlencoded({ extended: true }))
app.use('/', express.static(path.join(__dirname,"views/student")))
app.use('/api', routes)


PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("started on", PORT);
})


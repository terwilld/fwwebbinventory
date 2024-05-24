const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');

const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError')
const Joi = require('joi');
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const customerRoutes = require('./routes/customer.js')

const Inventory = require('./models/inventory.js')


require('dotenv').config()
let dbURL, secret
//console.log(`This is node running in ${process.env.NODE_ENV} mode`)
if (process.env.NODE_ENV == "production") {
    console.log('Running in production mode')
    dbURL = process.env.dbURL
    secret = process.env.secret
} else {
    console.log('running in development mode')
    dbURL = 'mongodb://127.0.0.1:27017/fwwebb'
    secret = 'secret'
}

mongoose.connect(dbURL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected by mongoose")
})
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))


const sessionConfig = {
    name: 'myfancycoookiename',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure:true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }

}
app.use(session(sessionConfig))
app.use(flash());




app.use((req, res, next) => {
    console.log(req.query)
    //console.log("inside my custom middleware")
    // console.log(req.flash('success'))
    //console.log(req.session)
    res.locals.currentUser = req.user
    // console.log(res.locals.currentUser)
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next();
})

app.use('/customer', customerRoutes)
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))



app.get('/', (req, res) => {
    res.render('home.ejs')
    // res.send("In The Campgrounds index page")
})



app.all('*', (req, res, next) => {
    next(new ExpressError("Page not found", 404))
})

// app.use((err, req, res, next) => {
//     console.log("Whoops**********")
//     console.log(err)
//     const { statusCode = 404, message = 'Something Broke' } = err;
//     if (!err.message) err.message = 'Oh No, Something went wrong';
//     res.status(statusCode).render('error', { err });
// })


app.listen(3000, () => {
    console.log('app is running on 3000')
})
const express = require('express');

const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

//passport config
require('./config/passport')(passport);






const app = express();



//db config
const db = require('./config/keys').MongoURI;



//connect to mongo
mongoose.connect(db, {useNewUrlParser: true})
.then( ()=> console.log("Mongodb connect.."))
.catch(err => console.log(err))

//Bodyparser
app.use(express.urlencoded({extended: false}))

//express-session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    
  }))
app.use(passport.initialize());
app.use(passport.session());



  //connect-flash
  app.use(flash())

  //global vars
  app.use((req,res,next)=>{
      res.locals.success_msg = req.flash('success_msg')
      res.locals.error_msg = req.flash('error_msg')
      res.locals.error = req.flash('error')
      
      next()
  })

//ejs
app.use(expressLayouts)
app.set('view engine', 'ejs')
//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server started on port ${PORT}`))



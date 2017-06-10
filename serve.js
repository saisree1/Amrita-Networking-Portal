
const express = require('express')

const app = express()

var datastore=require('nedb')
var db= new datastore({filename:'store5.db',autoload:true})

app.set('view engine','ejs')

app.set('port',process.env.PORT||5000)
app.use(express.static(__dirname+'/pub'))
app.get('/', function (req, res) {
  res.sendFile(__dirname+'/pub/sign.html')
  })

/*app.get('/back',function(req,res) {
  var a=req.query.username;
  db.find({},function(err,result) {
    
  res.render('new1',{ab:result,username:a})
  // body...
})
})
 
app.get('/search',function(req,res) {
  // body...
  var a=req.query.username;
  db.find({'email':req.query.search1},function(err,result) {
        // body...
        
        res.render('new1',{ab:result,username:a})
      })

})*/
 app.get('/db',function(req,res)
 {
 db.find({'email':req.query.email,'password':req.query.password},function(err,result1) {
    // body...
    var a=req.query.email;
    if(result1.length!=0)
    {
      db.find({},function(err,result) {
        // body...
        res.render('dbase',{ab:result,email:a})
      })
      
    }
    else 
    {
      res.send('wrong password or email')
    }
})
 })
 
app.get('/profile/:username',function(req,res)
 {
  var a=req.params.username
  db.find({'name':a},function(err,result)
 {
  console.log(result);
res.render('dbase6',{nam:result[0].name,res3:result})

 })
      
  })

app.get('/myprofile/:email',function(req,res)
 {
  var a=req.params.email
  db.find({'email':a},function(err,result)
 {
  console.log(result);
res.render('dbase2',{name:a,res1:result})
 })
 
  })

//app.get('/my',function(req,res) {
  // body...
//db.find({'email':req..email},function(err,result) {
        // body...
        
    //    res.render('db2',{ab:result})
  //    })

//})

 app.get('/signup-store',function(req,res)
 {
 	db.insert({
 	'name':req.query.name,
 	'email':req.query.email,
  'name1':req.query.name1,
 	'password':req.query.pwd,
  'gender':req.query.gender
 },function(err,newDoc)
 {
res.sendFile(__dirname+'/pub/log.html')
 })
 
  })

 /*app.get('/login',function(req,res)
 {
 	res.render(__dirname+'/public/login.html')
  })*/

app.listen(app.get('port'),function() {
  // body...
  console.log("listening at 3001")
})
/*
app.listen(2000,function() {
  // body...
  console.log("listening at 2000")
})*/
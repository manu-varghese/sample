var express = require('express');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();
var signupErr = null
const verifyLogin = (req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

const products =[
  {
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSCsgMhedP8aI33qW_csOwNGDRydwgQXJC8OA_V-yfeavnqUVqD7H8hp098qpbtoJo_19xiMeJRP1Q&usqp=CAc',
    name: 'Samsung Galaxy M13',
    price: 11999,
    description: 'Up to 12GB RAM with RAM Plus | FHD+ Display | Auto Data Switching'
  },
  {
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSCsgMhedP8aI33qW_csOwNGDRydwgQXJC8OA_V-yfeavnqUVqD7H8hp098qpbtoJo_19xiMeJRP1Q&usqp=CAc',
    name: 'Samsung Galaxy M13',
    price: 11999,
    description: 'Up to 12GB RAM with RAM Plus | FHD+ Display | Auto Data Switching'
  },
  {
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSCsgMhedP8aI33qW_csOwNGDRydwgQXJC8OA_V-yfeavnqUVqD7H8hp098qpbtoJo_19xiMeJRP1Q&usqp=CAc',
    name: 'Samsung Galaxy M13',
    price: 11999,
    description: 'Up to 12GB RAM with RAM Plus | FHD+ Display | Auto Data Switching'
  },
  {
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSCsgMhedP8aI33qW_csOwNGDRydwgQXJC8OA_V-yfeavnqUVqD7H8hp098qpbtoJo_19xiMeJRP1Q&usqp=CAc',
    name: 'Samsung Galaxy M13',
    price: 11999,
    description: 'Up to 12GB RAM with RAM Plus | FHD+ Display | Auto Data Switching'
  }
]
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedIn){
  let person = req.session.user 
  res.render('users/view-products', {products, user:true , person});
  }else{
    res.render('users/view-products',{products, user:true })
  }
});

router.get('/login',function(req,res){
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
    res.render('users/login',{logginErr:req.session.logginErr})
    req.session.logginErr = false
  }
})

router.get('/logout',function(req,res){
  req.session.loggedIn = false
  res.redirect('/')
})

router.get('/signup',function(req,res){
  res.render('users/signup',{signupErr})
  signupErr = null
})

router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((data)=>{
    if(data.statuss){
      res.redirect('/login')
    }else{
      signupErr="User already exists!!"
        res.redirect('/signup')
    }
  })
})

router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.logginErr = true
      res.redirect('/login')
    }
  })
})


module.exports = router;

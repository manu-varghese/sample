var express = require('express');
var router = express.Router();
var adminHelpers = require('../helpers/admin-helpers')
var userEdit = require('../config/collections')
const credentials = {
  email:'admin@gmail.com',
  password: 'admin'
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  if(req.session.adminLoggedIn){
    adminHelpers.getAllUsers().then((users)=>{
      res.render('admin/view-users', { users, admin: true });
  
    })
  }else{
    res.redirect('/admin/adminLogin')
  }
});

router.get('/adminLogin',(req,res)=>{
  if(req.session.adminLoggedIn){
    res.redirect('/admin')
  }else{
    res.render('admin/admin-login',{adminLoginError:req.session.adminLoginError})
    req.session.adminLoginError = null
  }
})

router.post('/adminLogin',(req,res)=>{
  if(req.body.email == credentials.email && req.body.password == credentials.password){
    req.session.adminLoggedIn = true;
    req.session.admin = req.body.email;
    res.redirect('/admin')

  }else{
    req.session.adminLoginError = true
    res.redirect('/admin/adminLogin')
  }
})

router.get('/adminLogout',function(req,res){
  req.session.adminLoggedIn = false;
  res.redirect('/admin')
})

router.get('/admin', function (req, res) {
  res.render('admin/view-users', { admin: true })
})

router.get('/editclick',(req,res)=>{
  userEdit.EDIT_PAGE = false
})

router.get('/add-user', function (req, res) {
  if(req.session.adminLoggedIn){
    res.render('admin/add-user', { admin: true })
  }else{
    res.redirect('/admin/adminLogin')
  }
})

router.post('/add-user', function (req, res) {
  adminHelpers.addUser(req.body).then((data)=>{
    if(data){
      res.redirect('/admin')
    }
  })
})

router.get('/delete-user/:id',(req,res)=>{
  let userId = req.params.id
  adminHelpers.deleteUser(userId).then((response)=>{
    res.redirect('/admin')
  })
})

router.get('/edit-user/:id',async (req,res)=>{
  let persons = await adminHelpers.getUserDetails(req.params.id)
  if(userEdit.EDIT_PAGE){
    res.redirect('/admin')
  }else{
    res.render('admin/edit-user',{persons})
  }
})

router.post('/edit-user/:id',(req,res)=>{
  adminHelpers.updateProduct(req.params.id,req.body).then(()=>{
    userEdit.EDIT_PAGE = true
    res.redirect('/admin')
  })
})
module.exports = router;

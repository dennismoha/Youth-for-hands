var express = require('express');
var router = express.Router();

/* display the index page. */
router.get('/', function(req, res, next) {
  return res.render('users/index',{title:'Youth Hands for Development'});
});

//about page
router.get('/mission',(req,res)=>{
  return res.render('users/About',{title:'Youth Hands for Development'})
})

//contact
router.get('/contact',(req,res)=>{
  return res.render('users/contact',{title:'Youth Hands for Development'})
})






module.exports = router;

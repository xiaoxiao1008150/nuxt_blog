import { Router } from 'express';
const router = Router();
const mongoose = require('mongoose');
const Post = require('../models/post');
const Category = require('../models/category');
const User = require('../models/user');

// 管理用户登录
router.post('/user/login', (req, res) => {
  if (req.body.username === 'admin' && req.body.password === 'admin11') {
    req.session.authUser = { username: 'admin' }
    return res.json({ username: 'admin' })
  }
  res.status(401).json({ message: '您没有权限访问此页面' })
})

// 管理用户登出
router.post('/user/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

// router.post('/', function(req, res, next) {  
//   var _user = new User(req.body.data);
//   User.findOne({name: _user.name}, function (err, user_a) {
//     if (err) res.json(err.status|| 500, {"errorMsg":err.message});
//       user_a.comparePwd(_user.password,function(err_b,isMatch){
//         if(err) res.json(err_b.message||500, {"errorMsg":err_b.message})
//         else if(isMatch){
//           req.session.user_session= user_a;
//           res.json({"data":{"name":user_a.name,"_id":user_a._id}})
//         }
//         else  res.json(500, {"errorMsg": "用户名或密码错误"})
//       })

//   })
// });

// 查找用户
router.get('/user/:id', function(req, res, next){
  let id = req.params.id;
  User.findOne({_id:id}, function(err, user){
    if(err){
      res.json({
        status: 0,
        code: 500,
        msg: "请稍后重试"
      });
    }else {
      res.json({
        status: 1,
        user:user,
        msg: '查找用户成功'
      });
    }
  });
});

// 后台账户密码修改
router.post('/user/update-password', function(req, res, next){
  let {oldp, newp} = req.body;
  let name = 'admin'
  User.findOne({name: name}, function(err, user){
    if(err){
      console.log(err)
    }
    if (user.password === oldp) {
      user.password = newp;
      user.save(function(err, user){
        res.json({
          status: 1,
          msg: '成功修改密码'
        })
      })
    }
  });
});
// 添加用户
router.post('/add-user', function(req, res, next){
  let {name} = req.body;
  let {password} = req.body;
  let user = new User({
    name,
    password
  });
  user.save(function (err, user) {
    if (err) {
      res.json({
        status: 0,
        code: 500,
        msg: "请稍后重试"
      });
    }else{
      res.json({
        status: 1,
        user:user,
        msg: '添加用户成功'
      });
    }
  });
});

export default router;

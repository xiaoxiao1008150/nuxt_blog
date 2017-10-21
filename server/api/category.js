import { Router } from 'express';
const router = Router();
const mongoose = require('mongoose');
const Post = require('../models/post');
const Category = require('../models/Category');

// 获取全部分类
router.get('/categories', function(req, res, next){
  Category.find({}, function(err, categories){
    if(err) {
      res.json({
        status: 0,
        msg: err.message
      });
    }else{
      res.json({
        status: 1,
        count: categories.length,
        categories: categories
      });
    }
  });
});

// 添加分类
router.post('/add-category', function(req, res, next){
  let {name} = req.body;
  let slug = name.toLowerCase();
  let category = new Category({
    name,
    slug
  });
  category.save(function (err, category) {
    if (err) {
      res.json({
        status: 0,
        code: 500,
        msg: "请稍后重试"
      });
    }else{
      res.json({
        status: 1,
        msg: '添加分类成功'
      });
    }
  });
});

export default router;

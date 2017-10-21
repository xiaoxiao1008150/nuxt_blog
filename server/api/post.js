import { Router } from 'express';
const router = Router();
const mongoose = require('mongoose');
const Post = require('../models/post');
const Category = require('../models/Category');

// 获取全部文章
router.get('/posts', function(req, res, next){
    var sortby = req.query.sortby ? req.query.sortby : 'created';
    var sortdir = req.query.sortdir ? parseInt(req.query.sortdir) : -1; // -1是降序

    if (['title', 'category', 'author', 'created', 'published'].indexOf(sortby) === -1) {
        sortby = 'created';
    }
    // if (['desc', 'asc'].indexOf(sortdir) === -1) {
    //     sortdir = -1;
    // }

    var sortObj = {};
    sortObj[sortby] = sortdir;
    // condition
    var conditions = {};
    if (req.query.category) {
        conditions.category = req.query.category.trim();
    }
    // 关键词搜索现在要搜索框合适，项目现在没有
    // if (req.query.keyword) {
    //     conditions.title = new RegExp(req.query.keyword.trim(), 'i');
    //     conditions.content = new RegExp(req.query.keyword.trim(), 'i');
    // }
    // 
    Post.find(conditions)
            .sort(sortObj)
            .populate('category')
            .exec(function (err, posts) {
              if(err){
                res.json({
                  status: 0,
                  msg: err.message
                });
              }else{
                res.json({
                  status: 1,
                  count: posts.length,
                  posts:posts
                });
              }
            });     
});

// 按日期获取最近的十片文章
router.get('/posts/recently', function(req, res, next){
  let count = 10;
    Post.find({}).limit(count)
        .exec(function(err,posts){
          if(err){
            res.json({
              status: 0,
              msg: err.message
            })
          }else{
            res.json({
              status: 1,
              count: posts.length,
              posts:posts
            });
          }
      }); 
});

// 按标签关键词 slug 找所有文章
router.get('/posts/:slug', function(req, res, next){
    let conditions = {};
    conditions.slug = req.params.slug;

    Post.find(conditions, function(err, posts){
      if(err){
        res.json({
          status:0,
          msg:err.message
        });
      }else{
        res.json({
          status:1,
          count:posts.length,
          posts:posts
        });
      }
    });
});
//一篇文章详情
router.get('/posts/detail/:brief', function(req, res, next){
  let brief = req.params.brief;
  Post.findOne({ brief: brief })
      .populate('category')
      .exec(function(err, post){
        if(err) {
          res.json({

          });
        }else{
          res.json({
            status: 1,
            post: post
          });
        }
      });
}); 
router.get('/posts/detail_id/:id', function(req, res, next){
  let id = req.params.id;
  Post.findById(id)
      .populate('category')
      .exec(function(err, post){
        if(err) {
          res.json({

          });
        }else{
          res.json({
            status: 1,
            post: post
          });
        }
      });
}); 
// 删除一篇文章 admin 
router.post('/posts/delete/:id', function(req, res, next){
  Post.remove({ _id: req.params.id }).exec(function (err, post) {
        if (err) {
          return res.json({
            status: 0,
            meg: err.message
          })
        }
        if (post) {
            res.json({
              status: 1,
              msg: post
            });
        } else {
            res.json({
              status: 1,
              msg: "文章删除失败"
            });
        }
    });
});

// 添加文章
router.post('/add-post', function(req, res, next){
  let params = req.body;
  // 需要修改的
  Category.findOne({name:params.category}, function(err,doc){
    if(err) {
      res.json({
        status: 0,
        meg: err.message
      });
    }else{
      if(params.id) {// 文章已有，需要修改
        Post.findOneAndUpdate({ "_id": params.id }, { "$set": 
          { "title": params.title, 
            "content": params.content, 
            "brief": params.brief, 
            "tag": params.tag,
            "category": doc._id,
          }}).exec(function(err, hasPost){
           if(err) {
               console.log(err);
               res.status(500).send(err);
           } else {
              res.json({
                status: 1,
                post: hasPost,
                msg: '文章修改成功'
              });
           }
        });
        //
      }else{
        let newPost = new Post({
          title: params.title,
          content: params.content,
          brief:params.brief,
          tag:params.tag,
          category:doc._id,
          published: true,
          comments: [],
          created: new Date()
        });
        newPost.save(function (err1, post) {
          // 注意，当Scheme字段定义必填的时候，如果前台没有填写完成，也会返回错误，但是整体请求是成功的
          // 此处的err不是指的是前端请求的成功与否，而是指的是数据库操作的相关错误
          if (err1) {
            res.json({
              status: 0,
              code: 500,
              msg: '请重新尝试'
            });
          }else{
            res.json({
              status: 1,
              msg: '添加文章成功'
            });
          }
        });
      }
    }
  });
  
});





export default router;

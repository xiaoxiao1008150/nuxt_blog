import { Router } from 'express';
const router = Router();
const mongoose = require('mongoose');
const Post = require('../models/post');
const Category = require('../models/Category');

// 获取全部文章
router.get('/posts', function(req, res, next){
    let sortby = req.query.sortby ? req.query.sortby : 'created';
    let sortdir = req.query.sortdir ? parseInt(req.query.sortdir) : -1; // -1是降序

    if (['meta.votes', 'meta.ips', 'title', 'category', 'author', 'created', 'published'].indexOf(sortby) === -1) {
        sortby = 'created';
    }
    // if (['desc', 'asc'].indexOf(sortdir) === -1) {
    //     sortdir = -1;
    // }

    let sortObj = {};
    sortObj[sortby] = sortdir;
    // condition
    let conditions = {};
    if (req.query.category) {
        conditions.category = req.query.category.trim();
    }
    // // 点赞
    // if (req.query.votes) {
    //     conditions.meta.votes = req.query.category.trim();
    // }
    // 分页条件
    let page = +req.query.page || 0;
    let pageSize = +req.query.pageSize;
    let skip = 0
    if (page && pageSize) {
      skip = (page - 1) * pageSize;//跳过多少条
    }
    // 年份归档
    let year = req.query.year
    // if (year) {
    //   conditions.year = +(req.query.year.trim());
    // }

    // 关键词搜索现在要搜索框合适，项目现在没有
    // if (req.query.tag) {
    //     conditions.tag = new RegExp(req.query.keyword.trim(), 'i');
    //     // conditions.content = new RegExp(req.query.keyword.trim(), 'i');
    // }
    // PersonModel.find({ favouriteFoods: "sushi" }, ...);
    // console.log('tag==', req.query.tag)
        // let productModel = Good.find(params).skip(skip).limit(pageSize);

    Post.find(conditions)
            .sort(sortObj)
            .populate('category')
            // .skip(skip).limit(pageSize)
            .exec(function (err, posts) {
              if(err){
                res.json({
                  status: 0,
                  msg: err.message
                });
              }else{
                // console.log('posts===', posts.length)
                if (page && pageSize) {
                  let results = posts.slice(skip, skip + pageSize);
                  res.json({
                    status: 1,
                    currentPage: page,
                    totalPage: Math.ceil(posts.length /pageSize),
                    posts:results
                  });
                }else if (year === 'all'){
                  // 处理找到的posts
                  let obj = {};
                  posts.forEach((item) => {
                      // console.log('type==', typeof (item.year+''))
                      // console.log('includes==', Object.keys(obj).includes(item.year+''))
                    let tep = item.year + "";
                    if (Object.keys(obj).includes(tep)){
                      obj[item.year].push(item);
                    }else{
                      obj[item.year] = [];
                      console.log('obj', obj)
                    }
                  });
                  console.log('year==', obj);
                  res.json({
                    status: 1,
                    posts: obj,
                    msg:'查找文档年份成功'
                  });
                }else{
                  res.json({
                    status: 1,
                    count: posts.length,
                    posts:posts, 
                    msg:'搜索文档成功'
                  });
                }

              }//else
            });
});

// 根据标签获取文章
router.get('/posts/:tag', function(req, res, next){
  Post.find({ tag: req.params.tag })
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
// router.get('/posts/recently', function(req, res, next){
//   let count = 10;
//     Post.find({}).limit(count)
//         .exec(function(err,posts){
//           if(err){
//             res.json({
//               status: 0,
//               msg: err.message
//             })
//           }else{
//             res.json({
//               status: 1,
//               count: posts.length,
//               posts:posts
//             });
//           }
//       }); 
// });

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

// 更新浏览次数
router.get('/posts/detail_id/:id', function(req, res, next){
  let id = req.params.id;
  // console.log('test 浏览次数====', 'hh')
  Post.findOneAndUpdate({ "_id":id }, {$inc :
            {'meta.ips' : 1
            }})
            .populate('category')
            .exec(function(err, hasPost){
           if(err) {
               // console.log(err);
               res.status(500).send(err);
           } else {
              res.json({
                status: 1,
                post: hasPost,
                msg: '浏览次数增加成功'
              });
           }
        });
}); 
// 删除一篇文章 admin 
router.post('/posts/delete/', function(req, res, next){
  Post.remove({ _id: req.body.id }).exec(function (err, post) {
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
               // console.log(err);
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
          meta:{
            votes: 0,
            ips: 0
          },
          created: new Date()
        });
        newPost.save(function (err1, post) {
          // console.log('test==', post);
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

// 增加点赞 
router.get('/add-vote/:id', function(req, res, next){
  let id = req.params.id;
    Post.findOneAndUpdate({ "_id":id }, {$inc :
            {'meta.votes' : 1
            }})
            .populate('category')
            .exec(function(err, hasPost){
           if(err) {
               // console.log(err);
               res.status(500).send(err);
           } else {
              res.json({
                status: 1,
                // post: hasPost,
                msg: '点赞成功'
              });
           }
        });
});






export default router;

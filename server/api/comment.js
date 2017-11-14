import { Router } from 'express';
const router = Router();
const mongoose = require('mongoose');
const Post = require('../models/post');
const Category = require('../models/category');
const Comment = require('../models/comment');

// 获取 一篇文章的所有评论
router.get('/get-comment/:id', function(req, res, next){
  let id = req.params.id
    Comment.find({post:id})
      .populate('from', 'name')
      .populate('reply.to', 'name')
      .exec(function(err, comments){
        console.log('comments', comments)
        if(err) {
          res.json({

          });
        }else{
          res.json({
            status: 1,
            count: comments.length,
            comments: comments
          });
        }
      });
});
// 增加一条评论
router.post('/add-comment', function(req, res, next){
  let { comment, post ,user, hasCommentId } = req.body;
  // flag 为true ,说明 是回复评论，不是发表评论
  console.log('hhh===', hasCommentId);
  console.log('内容===', comment);
  // console.log('userid===', );
  if(hasCommentId){
    Comment.findById(hasCommentId)
      .populate('from', 'name')
      .populate('reply.to', 'name')
      .exec(function(err, doc){
        var reply = {
          to: user._id,
          content: comment
        };
        doc.reply.push(reply);
        doc.save(function(err, newdoc){
          if(err){
            console.log(err);
          }
          console.log('replyC==', newdoc);
          res.json({
            status: 1,
            reply: true, 
            comment: newdoc,
            reply_text: {
              from: newdoc.from.name,
              to: user.name,
              content: comment
            },
            msg: '回复评论成功'
          });
          // res.redirect('/movie/' + movieId)
        });
      });
  }else{
    var newComment = {
      post: post,
      from: user._id,
      content: comment
    }
    var commentData = new Comment(newComment);

    commentData.save(function(err, doc){
      if(err){
        console.log(err);
      }else {
        res.json({
          status: 1,
          comment: doc,
          from: user.name, 
          content: comment, 
          start: true, 
          msg: '评论添加成功'
        });
      }
      console.log('newComment===', doc);
      // res.redirect('/movie/' + movieId)
    })
  }
});

// 

export default router
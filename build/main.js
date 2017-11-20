require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Post model
var mongoose = __webpack_require__(0),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    // 摘要 到文章详情的时候需要 URL + 2015/06/20 + brief
    brief: { type: String, required: true },
    //是文章的标签，关键词 ,按标签查找文章的时候需要
    tag: [],
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    published: { type: Boolean, default: false },
    comments: [Schema.Types.Mixed],
    meta: {
        votes: Number, // 点赞次数
        ips: Number //: 浏览次数
    },
    year: { type: Number, default: new Date().getFullYear() },
    created: { type: Date, default: new Date() }
});

var Post = module.exports = mongoose.model('Post', PostSchema);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Category model

var mongoose = __webpack_require__(0),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    created: { type: Date, default: new Date() }
});

var Category = module.exports = mongoose.model('Category', CategorySchema);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_express_session__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_express_session___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_express_session__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api__ = __webpack_require__(9);




var MongoStore = __webpack_require__(8)(__WEBPACK_IMPORTED_MODULE_3_express_session___default.a); // session连接mongoose
// const mongoose = require('mongoose')


var env = "production" || 'development';

var app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 3000;

var dbUrl = "mongodb://47.104.98.140:27017/nuxt_blog";
if (env === "development") {
  dbUrl = "mongodb://localhost:27017/nuxt_blog";
}
// 数据库设置
var db = __WEBPACK_IMPORTED_MODULE_4_mongoose___default.a.connect(dbUrl);
// const db = mongoose.connect("mongodb://localhost:27017/nuxt_blog");
// 数据库连接
db.connection.on("error", function (error) {
  console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
  console.log("------数据库连接成功！------");
});

app.set('host', '127.0.0.1');
app.set('port', port);

app.use(__WEBPACK_IMPORTED_MODULE_2_body_parser___default.a.json());
app.use(__WEBPACK_IMPORTED_MODULE_2_body_parser___default.a.urlencoded({
  extended: true
}));
// Sessions 来创建 req.session
app.use(__WEBPACK_IMPORTED_MODULE_3_express_session___default()({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 * 60 * 24 }, // 一天
  store: new MongoStore({ mongooseConnection: db.connection })
}));

// Import API Routes
app.use('/api', __WEBPACK_IMPORTED_MODULE_5__api__["a" /* default */]);

// Import and Set Nuxt.js options
var config = __webpack_require__(17);
config.dev = !("production" === 'production');

// Init Nuxt.js
var nuxt = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Nuxt"](config);

// Build only in dev mode
if (config.dev) {
  var builder = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Builder"](nuxt);
  builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

// Listen the server
app.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__post__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__category__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__comment__ = __webpack_require__(15);







var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

// Add USERS Routes
router.use(__WEBPACK_IMPORTED_MODULE_1__post__["a" /* default */]);
router.use(__WEBPACK_IMPORTED_MODULE_2__category__["a" /* default */]);
router.use(__WEBPACK_IMPORTED_MODULE_3__user__["a" /* default */]);
router.use(__WEBPACK_IMPORTED_MODULE_4__comment__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
var mongoose = __webpack_require__(0);
var Post = __webpack_require__(2);
var Category = __webpack_require__(3);

// 获取全部文c
router.get('/posts', function (req, res, next) {
  var sortby = req.query.sortby ? req.query.sortby : 'created';
  var sortdir = req.query.sortdir ? parseInt(req.query.sortdir) : -1; // -1是降序

  if (['meta.votes', 'meta.ips', 'title', 'category', 'author', 'created', 'published'].indexOf(sortby) === -1) {
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
  // // 点赞
  // if (req.query.votes) {
  //     conditions.meta.votes = req.query.category.trim();
  // }
  // 分页条件
  var page = +req.query.page || 0;
  var pageSize = +req.query.pageSize;
  var skip = 0;
  if (page && pageSize) {
    skip = (page - 1) * pageSize; //跳过多少条
  }
  // 年份归档
  var year = req.query.year;
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

  Post.find(conditions).sort(sortObj).populate('category')
  // .skip(skip).limit(pageSize)
  .exec(function (err, posts) {
    if (err) {
      res.json({
        status: 0,
        msg: err.message
      });
    } else {
      // console.log('posts===', posts.length)
      if (page && pageSize) {
        var results = posts.slice(skip, skip + pageSize);
        res.json({
          status: 1,
          currentPage: page,
          totalPage: Math.ceil(posts.length / pageSize),
          posts: results
        });
      } else if (year === 'all') {
        // 处理找到的posts
        var obj = {};
        posts.forEach(function (item) {
          // console.log('type==', typeof (item.year+''))
          // console.log('includes==', Object.keys(obj).includes(item.year+''))
          var tep = item.year + "";
          if (Object.keys(obj).includes(tep)) {
            obj[item.year].push(item);
          } else {
            obj[item.year] = [];
          }
        });
        res.json({
          status: 1,
          posts: obj,
          msg: '查找文档年份成功'
        });
      } else {
        res.json({
          status: 1,
          count: posts.length,
          posts: posts,
          msg: '搜索文档成功'
        });
      }
    } //else
  });
});

// 根据标签获取文章
router.get('/posts/:tag', function (req, res, next) {
  Post.find({ tag: req.params.tag }).populate('category').exec(function (err, posts) {
    if (err) {
      res.json({
        status: 0,
        msg: err.message
      });
    } else {
      res.json({
        status: 1,
        count: posts.length,
        posts: posts
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
router.get('/posts/:slug', function (req, res, next) {
  var conditions = {};
  conditions.slug = req.params.slug;

  Post.find(conditions, function (err, posts) {
    if (err) {
      res.json({
        status: 0,
        msg: err.message
      });
    } else {
      res.json({
        status: 1,
        count: posts.length,
        posts: posts
      });
    }
  });
});
//一篇文章详情
router.get('/posts/detail/:brief', function (req, res, next) {
  var brief = req.params.brief;
  Post.findOne({ brief: brief }).populate('category').exec(function (err, post) {
    if (err) {
      res.json({});
    } else {
      res.json({
        status: 1,
        post: post
      });
    }
  });
});

// 更新浏览次数
router.get('/posts/detail_id/:id', function (req, res, next) {
  var id = req.params.id;
  Post.findOneAndUpdate({ "_id": id }, { $inc: { 'meta.ips': 1
    } }).populate('category').exec(function (err, hasPost) {
    if (err) {
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
router.post('/posts/delete/', function (req, res, next) {
  Post.remove({ _id: req.body.id }).exec(function (err, post) {
    if (err) {
      return res.json({
        status: 0,
        meg: err.message
      });
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
router.post('/add-post', function (req, res, next) {
  var params = req.body;
  // 需要修改的
  Category.findOne({ name: params.category }, function (err, doc) {
    if (err) {
      res.json({
        status: 0,
        meg: err.message
      });
    } else {
      if (params.id) {
        // 文章已有，需要修改
        Post.findOneAndUpdate({ "_id": params.id }, { "$set": { "title": params.title,
            "content": params.content,
            "brief": params.brief,
            "tag": params.tag,
            "category": doc._id
          } }).exec(function (err, hasPost) {
          if (err) {
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
      } else {
        var newPost = new Post({
          title: params.title,
          content: params.content,
          brief: params.brief,
          tag: params.tag,
          category: doc._id,
          published: true,
          comments: [],
          meta: {
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
          } else {
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
router.get('/add-vote/:id', function (req, res, next) {
  var id = req.params.id;
  Post.findOneAndUpdate({ "_id": id }, { $inc: { 'meta.votes': 1
    } }).populate('category').exec(function (err, hasPost) {
    if (err) {
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

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
var mongoose = __webpack_require__(0);
var Post = __webpack_require__(2);
var Category = __webpack_require__(3);

// 获取全部分类
router.get('/categories', function (req, res, next) {
  Category.find({}, function (err, categories) {
    if (err) {
      res.json({
        status: 0,
        msg: err.message
      });
    } else {
      res.json({
        status: 1,
        count: categories.length,
        categories: categories
      });
    }
  });
});

// 添加分类
router.post('/add-category', function (req, res, next) {
  var name = req.body.name;

  var slug = name.toLowerCase();
  var category = new Category({
    name: name,
    slug: slug
  });
  category.save(function (err, category) {
    if (err) {
      res.json({
        status: 0,
        code: 500,
        msg: "请稍后重试"
      });
    } else {
      res.json({
        status: 1,
        msg: '添加分类成功'
      });
      // res.sendStatus(200);
    }
  });
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
var mongoose = __webpack_require__(0);
var Post = __webpack_require__(2);
var Category = __webpack_require__(3);
var User = __webpack_require__(13);

// 管理用户登录
router.post('/user/login', function (req, res) {
  if (req.body.username === 'admin' && req.body.password === 'admin11') {
    req.session.authUser = { username: 'admin' };
    return res.json({ username: 'admin' });
  }
  res.status(401).json({ message: '您没有权限访问此页面' });
});

// 管理用户登出
router.post('/user/logout', function (req, res) {
  delete req.session.authUser;
  res.json({ ok: true });
});

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
router.get('/user/:id', function (req, res, next) {
  var id = req.params.id;
  // console.log('name===', name)
  User.findOne({ _id: id }, function (err, user) {
    if (err) {
      res.json({
        status: 0,
        code: 500,
        msg: "请稍后重试"
      });
    } else {
      res.json({
        status: 1,
        user: user,
        msg: '查找用户成功'
      });
    }
  });
});

// 后台账户密码修改
router.post('/user/update-password', function (req, res, next) {
  var _req$body = req.body,
      oldp = _req$body.oldp,
      newp = _req$body.newp;

  console.log('rrrr===', req.body);
  var name = 'admin';
  User.findOne({ name: name }, function (err, user) {
    if (err) {
      console.log(err);
    }
    if (user.password === oldp) {
      user.password = newp;
      user.save(function (err, user) {
        res.json({
          status: 1,
          msg: '成功修改密码'
        });
      });
    }
  });
});
// 添加用户
router.post('/add-user', function (req, res, next) {
  var name = req.body.name;
  var password = req.body.password;

  var user = new User({
    name: name,
    password: password
  });
  user.save(function (err, user) {
    if (err) {
      res.json({
        status: 0,
        code: 500,
        msg: "请稍后重试"
      });
    } else {
      res.json({
        status: 1,
        user: user,
        msg: '添加用户成功'
      });
    }
  });
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(0),
    Schema = mongoose.Schema;

var crypto = __webpack_require__(14);

var UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    role: { type: Number, default: 0 },
    password: { type: String, required: true },
    created: { type: Date, default: new Date() }
});

UserSchema.pre("save", function (next) {
    var content = this.password + "xiao";
    var sha = crypto.createHash('sha512WithRSAEncryption');
    sha.update(content);
    this.password = sha.digest('hex');
    next();
});

UserSchema.methods = {
    comparePwd: function comparePwd(password, cb) {
        var sha = crypto.createHash('sha512WithRSAEncryption');
        sha.update(password + "xiao");
        var d = sha.digest('hex');
        cb(null, d == this.password);
    }
};

var User = module.exports = mongoose.model('User', UserSchema);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
var mongoose = __webpack_require__(0);
var Post = __webpack_require__(2);
var Category = __webpack_require__(3);
var Comment = __webpack_require__(16);

// 获取 一篇文章的所有评论
router.get('/get-comment/:id', function (req, res, next) {
  var id = req.params.id;
  Comment.find({ post: id }).populate('from', 'name').populate('reply.to', 'name').exec(function (err, comments) {
    if (err) {
      res.json({});
    } else {
      res.json({
        status: 1,
        count: comments.length,
        comments: comments
      });
    }
  });
});
// 增加一条评论
router.post('/add-comment', function (req, res, next) {
  var _req$body = req.body,
      comment = _req$body.comment,
      post = _req$body.post,
      user = _req$body.user,
      hasCommentId = _req$body.hasCommentId;
  // flag 为true ,说明 是回复评论，不是发表评论

  if (hasCommentId) {
    Comment.findById(hasCommentId).populate('from', 'name').populate('reply.to', 'name').exec(function (err, doc) {
      var reply = {
        to: user._id,
        content: comment
      };
      doc.reply.push(reply);
      doc.save(function (err, newdoc) {
        if (err) {
          console.log(err);
        }
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
  } else {
    var newComment = {
      post: post,
      from: user._id,
      content: comment
    };
    var commentData = new Comment(newComment);

    commentData.save(function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          status: 1,
          comment: doc,
          from: user.name,
          content: comment,
          start: true,
          msg: '评论添加成功'
        });
      }
    });
  }
});

// 

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(0);
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var CommentSchema = new Schema({
  post: { type: ObjectId, ref: 'Post' },
  from: { type: ObjectId, ref: 'User' },
  reply: [{
    // from: {type: ObjectId, ref: 'User'},
    to: { type: ObjectId, ref: 'User' },
    content: String,
    createAt: { type: Date, default: Date.now() }
  }],
  content: String,
  createAt: {
    type: Date,
    default: Date.now()
  }
});

// CommentSchema.pre('save',function(next){
//   var user = this;
//   if(this.isNew){
//     this.meta.createAt = this.meta.updateAt = Date.now();
//   }else{
//     this.meta.updateAt = Date.now();
//   }
//   next();
// });


var Category = module.exports = mongoose.model('Comment', CommentSchema);

/***/ }),
/* 17 */
/***/ (function(module, exports) {


module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css', '~/assets/css/font.css', 'quill/dist/quill.snow.css', 'quill/dist/quill.bubble.css', 'quill/dist/quill.core.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend: function extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },
  plugins: [{ src: '~plugins/nuxt-quill-plugin.js', ssr: false }, '~plugins/filters.js']
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map
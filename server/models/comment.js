var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var CommentSchema = new Schema({
  post: {type: ObjectId, ref: 'Post'},
  from: {type: ObjectId, ref: 'User'},
  reply:[{
    // from: {type: ObjectId, ref: 'User'},
    to: {type: ObjectId, ref: 'User'},
    content: String,
    createAt:{ type:Date, default:Date.now()}
  }],
  content: String,
  createAt:{
    type:Date,
    default:Date.now()
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


const Category = module.exports = mongoose.model('Comment', CommentSchema);
















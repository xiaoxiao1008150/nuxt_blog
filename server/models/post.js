// Post model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    // 摘要 到文章详情的时候需要 URL + 2015/06/20 + brief
    brief: { type: String, required: true },
    //是文章的标签，关键词 ,按标签查找文章的时候需要
    tag: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    published: { type: Boolean, default: false },
    comments: [ Schema.Types.Mixed ],
    created: { type: Date, default: new Date }
});

const Post = module.exports =  mongoose.model('Post', PostSchema);




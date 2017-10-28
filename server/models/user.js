var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var crypto = require('crypto')

var UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String},
    role: { type: Number, default: 0},
    password: { type: String, required: true },
    created: { type: Date, default: new Date} 
});

UserSchema.pre("save",function (next) {  
    var content = this.password + "xiao";
    var sha = crypto.createHash('sha512WithRSAEncryption');
    sha.update(content);
    this.password = sha.digest('hex');
    next();
})

UserSchema.methods = {  
    comparePwd: function (password, cb) {
        var sha = crypto.createHash('sha512WithRSAEncryption');
        sha.update(password + "xiao");
        var d = sha.digest('hex');
        cb(null, d == this.password);
    }
};


const User = module.exports = mongoose.model('User', UserSchema);

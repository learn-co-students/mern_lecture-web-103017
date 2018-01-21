var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let UsersSchema = new Schema({
	username: String,
	passwordDigest: String,
})

module.exports = mongoose.model('User', UsersSchema);

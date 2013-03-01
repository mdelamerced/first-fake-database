var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define a new schema
var ArticleSchema = new Schema({
    slug : { type: String, lowercase: true, unique: true },
	headline : String,
	timepost : Date, Time,
	twitter : String,
	urlA : String,
	photo : String,
	text : String,
	skills : String,
	category : Boolean,
	
    lastupdated : { type: Date, default: Date.now }
});

// export 'Article' model
module.exports = mongoose.model('Article',ArticleSchema);
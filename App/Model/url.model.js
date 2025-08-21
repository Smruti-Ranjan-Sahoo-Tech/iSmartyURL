let mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
	shortID: {
		type: String,
		required: true,
		unique: true
	},
	originalUrl: {
		type: String,
		required: true,
		unique: true
	},
	visitHistory: [{
		timestamp: { type: Number, default: Date.now },
		ipAddress: { type: String }
	}]

}, { timestamps: true })
const urlModel = mongoose.model('url', urlSchema);
module.exports = urlModel;
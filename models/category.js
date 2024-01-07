const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CateogrySchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true }
})

CateogrySchema.virtual("url").get(function() {
    return `/catalog/category/${this._id}`
})

module.exports = mongoose.model("Category", CateogrySchema)
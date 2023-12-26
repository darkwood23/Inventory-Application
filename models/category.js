const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CateogrySchema = new Schema({
    title: { type: String, required: true},
    items: { type: Number, required: true, ref: "Item"},
    itemList: { type: Array, required: true, ref: "Item"}
})

CateogrySchema.virtual("url").get(() => {
    return `/catalog/cateogy/${this._id}`
})

module.exports = mongoose.model("Category", CateogrySchema)
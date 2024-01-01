const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    title: { type: String, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: "Category"}],
    stock: { type: Number, required: true},
    description: { type: String, required: true}
})

ItemSchema.virtual("url").get(() => {
    return `/catalog/item/${this._id}`
})

module.exports = mongoose.model("Item", ItemSchema)
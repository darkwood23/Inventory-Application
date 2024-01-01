const Category = require("../models/category")
const Item = require("../models/item")
const { body, validationResult } = require("express-validator")

const asyncHandler = require("express-async-handler")

exports.list = asyncHandler(async (req, res, next) => {
    const [category, item] = Promise.all([
        Category.find().exec(),
        Item.find().exec(),
    ])

    res.render("list", {
        title: "All books",
        category: category,
        item: item
    })
})

exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.find(req.params.id).populate("category").exec()

    if (item === null) {
        const err = new Error("Item not found")
        err.status = 404
        return next(err)
    }

    res.render("item_detail", {
        title: "Item Detail",
        item: item
    })
})

exports.item_create_get = asyncHandler(async (req, res, next) => {

})

exports.item_create_post = asyncHandler(async (req, res, next) => {

})

exports.item_update_get = asyncHandler(async (req, res, next) => {

})

exports.item_update_post = asyncHandler(async (req, res, next) => {
    
})

exports.item_delete_get = asyncHandler(async (req, res, next) => {

})

exports.item_delete_post = asyncHandler(async (req, res, next) => {
    
})
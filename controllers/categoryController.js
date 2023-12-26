const Category = require("../models/category")
const Item = require("../models/item")
const { body, validationResult } = require("express-validator")

const asyncHandler = require("express-async-handler")

exports.index = asyncHandler(async (req, res, next) => {
    const [
        numCategories,
        numItems,
        categories,
        items
    ] = await Promise.all([
        Category.countDocuments({}).exec(),
        Item.countDocuments({}).exec(),
        Category.find({}).sort({title: 1}).exec(),
        Item.find({}).exec()
    ])

    res.render("index", {
        title: "Elektronik Management",
        num_categories: numCategories,
        num_items: numItems,
        categories: categories,
        items: items,
    })
})

exports.category_create_get = asyncHandler(async (req, res, next) => {

})

exports.category_create_post = asyncHandler(async (req, res, next) => {

})

exports.category_update_get = asyncHandler(async (req, res, next) => {

})

exports.category_update_post = asyncHandler(async (req, res, next) => {
    
})

exports.category_delete_get = asyncHandler(async (req, res, next) => {

})

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    
})
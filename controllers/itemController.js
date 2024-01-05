const Category = require("../models/category")
const Item = require("../models/item")
const { body, validationResult } = require("express-validator")

const asyncHandler = require("express-async-handler")

exports.item_list = asyncHandler(async (req, res, next) => {
    const allItems = await Item.find().sort({ title: 1} ).exec()

    res.render("item_list", {
        title: "All books",
        all_items: allItems
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
    const allCategories = await Category.find({}, "title").sort({title: 1}).exec()

    res.render("item_form", {
        title: "Create Item",
        category_list: allCategories
    })
})

exports.item_create_post = [
    body("title", "Title of item must contain atleast 3 characters")
        .trim()
        .isLength({min: 3})
        .escape(),
    body("category").escape(),
    body("stock").escape(),
    body("description", "Description of item must contain atleast 10 characters")
        .trim()
        .isLength({min: 10})
        .escape(),
    body("price", "Item price must be defined")
        .trim()
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        const item = new Item({
            title: req.body.title,
            category: req.body.category,
            stock: req.body.stock,
            description: req.body.description
        })

        if(!errors.isEmpty()) {
            const allCategories = await Category.find({}, "title").sort({title: 1}).exec()

            res.render("item_form", {
                title: "Crate Item",
                category_list: allCategories,
                selected_categories: item.title._id,
                errors: errors.array(),
                item: item
            })

            return
        } else {
            await item.save()
            res.redirect(item.url)
        }
    })
]

exports.item_update_get = asyncHandler(async (req, res, next) => {
    const [item, categories] = await Promise.all([
        Item.findById(req.params.id).populate("category").exec(),
        Category.find().sort({title: 1}).exec()
    ])

    if(item === null) {
        const err = new Error("Item not found")
        err.status = 404
        return next(err)
    }

    res.render("item_form", {
        title: "Update Item",
        item: item,
        category_list: categories,
        selected_categories: item.category._id
    })
})

exports.item_update_post = [
    body("category", "Category must be specified")
        .trim()
        .isLength({min: 1})
        .escape(),
    body("title", "Title of item must be at least 3 characters")
        .trim()
        .isLength({ min: 3})
        .escape(),
    body("stock").escape(),
    body("description", "Description of item must be at least 10 characters")
        .trim()
        .isLength({min: 10})
        .escape(),
    body("price", "Item price must be defined")
        .trim()
        .escape(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        const item = new Item({
            title: req.body.title,
            category: req.body.category,
            stock: req.body.stock,
            description: req.body.description,
            item: req.body.price,
            _id: req.params.id
        })

        if(!errors.isEmpty()) {
            const allCategories = await Category.find({}, "title").exec()

            res.render("item_form", {
                title: "Update Item",
                category_list: allCategories,
                selected_categories: item.category._id,
                errors: errors.array(),
                item: item
            })

            return
        } else {
            await Item.findByIdAndUpdate(req.params.id, item, {})
            res.redirect(item.url)
        }
    })
]

exports.item_delete_get = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate("category").exec()

    if(item === null) {
        res.redirect("/catalog/category")
    }

    res.render("item_delete", {
        title: "Delete Item",
        item: item
    })
})

exports.item_delete_post = asyncHandler(async (req, res, next) => {
    await Item.findByIdAndDelete(req.body.itemid)

    res.redirect("/catalog/category")
})
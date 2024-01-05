const Category = require("../models/category")
const Item = require("../models/item")
const { body, validationResult } = require("express-validator")

const asyncHandler = require("express-async-handler")

exports.index = asyncHandler(async (req, res, next) => {
    const [
        numCategories,
        numItems,
    ] = await Promise.all([
        Category.countDocuments({}).exec(),
        Item.countDocuments({}).exec(),
    ])

    res.render("index", {
        title: "Elektronik Management",
        num_categories: numCategories,
        num_items: numItems,
    })
})

exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().sort({ title: 1 }).exec()

    res.render("category_list", {
        title: "Categories",
        all_categories: allCategories
    })
})

exports.category_detail = asyncHandler(async (req, res, next) => {
    const [category, itemsInCategory] = await Promise.all([
        Category.find(req.params.id).exec(),
        Item.find({category: req.params.id}, "title stock price").exec()
    ])

    if(category === null) {
        const err = new Error("Category not found")
        err.status = 404
        return next(err)
    }

    res.render("category_detail", {
        title: "Category Detail",
        category: category,
        items_in_category: itemsInCategory
    })
})

exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.render("category_form", { title: "Create Category" })
})

exports.category_create_post = [
    body("title", "Category title must contain at least 3 characters")
        .trim()
        .isLength({min: 3})
        .escape(),
    body("description", "Category description must contain at least 10 characters")
        .trim()
        .isLength({ min: 10})
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        const category = new Category({ title: req.body.title })

        if (!errors.isEmpty()) {
            res.render("category_form", {
                title: "Create Category",
                category: category,
                errors: errors.array()
            })
        } else {
            const categoryExists = await Category.findOne({ title: req.body.title }).exec()
            if(categoryExists) {
                res.redirect(categoryExists.url)
            } else {
                await category.save()
                res.redirect(category.url)
            }
        }
    })
]

exports.category_update_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec()

    if(category === null) {
        const err = new Error("Category Not Found")
        err.status = 404
        return next(err)
    }

    res.render("category_form", {
        title: "Update Category",
        category: category
    })
})

exports.category_update_post = [
    body('title', "Category title must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .exec(),
    body('description', "Category description must be at least 10 characters")
        .trim()
        .isLength({ min: 10})
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        const category = new Category({
            title: req.body.title,
            _id: req.params.id
        })

        if(!errors.isEmpty()) {
            res.render("category_form", {
                title: "Update Category",
                category: category,
                errors: errors.array()
            })
        } else {
            await Category.findByIdAndUpdate(req.params.id, category)
            res.redirect(category.url)
        }
    })
]

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    const [category, allCategoryItems] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({category: req.params.id}, "title stock").exec()
    ])

    if(category === null) {
        res.redirect("/catalog/categories")
    }

    res.render("category_delete", {
        title: "Delete Category",
        category: category,
        category_item: allCategoryItems
    })
})

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    const [category, allCategoryItems] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({ category: req.params.id}, "title stock").exec()
    ])

    if (allCategoryItems.length > 0) {
        res.render("category_delete", {
            title: "Delete Category",
            category: category,
            category_item: allCategoryItems
        })
        return
    } else {
        await Category.findByIdAndDelete(req.body.categoryid)
        res.redirect('/catalog/categories')
    }
})
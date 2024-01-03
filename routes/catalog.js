const express = require("express")
const router = express.Router()

const category_controller = require("../controllers/categoryController")
const item_controller = require("../controllers/itemController")

// Category 
router.get("/catalog", category_controller.index)
router.get("/catalog/category", category_controller.category_list)

router.get("/catalog/category/:id", category_controller.category_detail)

// Create
router.get("/catalog/category/create", category_controller.category_create_get)

router.post("/catalog/category/create", category_controller.category_create_post)

// Delete
router.get("/catalog/category/:id/delete", category_controller.category_delete_get)

router.post("/catalog/category/:id/delete", category_controller.category_delete_post)

// Update
router.get("/catalog/category/:id/update", category_controller.category_update_get)

router.post("/catalog/category/:id/update", category_controller.category_update_post)


// Item
router.get("/catalog/item", item_controller.item_list)
router.get("/catalog/item/:id", item_controller.item_detail)

// Create
router.get("/catalog/item/create", item_controller.item_create_get)

router.post("/catalog/item/create", item_controller.item_create_post)

// Delete
router.get("/catalog/item/:id/delete", item_controller.item_delete_get)

router.post("/catalog/item/:id/delte", item_controller.item_delete_post)

// Update
router.get("/catalog/item/:id/update", item_controller.item_update_get)

router.post("/catalog/item/:id/update", item_controller.item_update_post)

module.exports = router

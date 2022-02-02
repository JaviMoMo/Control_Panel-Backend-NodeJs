const express = require("express");
const router = express.Router();
const {isAuth} = require("../../middlewares/auth.middleware");

const {newCategory, getAllCategories, getCategoryById, getCategoryByTitle, getFilterCategories, deleteCategory, updateCategory} = require("../controllers/category.controller");

router.post("/create", [isAuth], newCategory);
router.get("/allCategories", [isAuth], getAllCategories);
router.get("/:categoryId", [isAuth], getCategoryById);
router.get("/:categoryTitle", [isAuth], getCategoryByTitle);
router.get("/items", [isAuth], getFilterCategories);
router.delete("/delete", [isAuth], deleteCategory);
router.put("/update", [isAuth], updateCategory);

module.exports = router;
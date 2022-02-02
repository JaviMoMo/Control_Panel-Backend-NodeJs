const Category = require("../models/Category");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

const newCategory = async (req, res, next) => {
    try {
        const newCategory = new Category();
        newCategory.title = req.body.title;
        newCategory.description = req.body.description;
        newCategory.notes = [];
        newCategory.tasks = [];
        newCategory.author = req.authority.id;
        const categoryDb = await newCategory.save()
        return res.json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            data: {categories: categoryDb}
        });
    } catch (err) {
        return next(err);
    }
}

const getAllCategories = async(req, res, next) => {
    try {
        const categories = await Category.find().populate("notes").populate("tasks").populate("author");
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { categories: categories }
        });
    } catch (err) {
        return next(err);
    }
}

const getCategoryById = async(req, res, next) => {
    try {
        const {categoryId} = req.params;
        const categoryDb = await Category.findById(categoryId).populate("notes").populate("tasks").populate("author");
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { categories: categoryDb}
        });
    } catch (err) {
        return next(err)
    }
}

const getCategoryByTitle = async(req, res, next) => {
    try {
        const {categoryTitle} = req.params;
        const categoryDb = await Category.find({title: categoryTitle}).populate("notes").populate("tasks").populate("author");
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { categories: categoryDb}
        });
    } catch (err) {
        return next(err)
    }
}

const getFilterCategories = async (req, res, next) => {
    try {
        const filters = req.query;
        const categories = await Category.find(filters);
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: {categories: categories}
        });
    } catch (err) {
        return next(err);
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const {_id} = req.body;
        await Category.deleteOne({_id: id})
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: {category: `${_id} deleted`}
        })
    } catch (err) {
        return next(err)
    }
}

const updateCategory = async (req, res, next) => {
    try{
        const {id} = req.body;
        const category = await Category.findByIdAndUpdate({id: id}, {id: id, title: req.body.title, description: req.body.description})
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { category: `${category.category} updated`}
        })
    } catch (err){
        return next(err)
    }
}

module.exports = {
    newCategory,
    getAllCategories,
    getCategoryById,
    getCategoryByTitle,
    getFilterCategories,
    deleteCategory,
    updateCategory
}
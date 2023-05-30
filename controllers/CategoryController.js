import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req,res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "Имя обязательно" });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Такая категория уже существует",
            });
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message: 'новая категория создана',
            category
        })

    }catch (error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'ошибка категорий'
        })
    }
};

//update category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            messsage: "Категория успешно обновлена",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Ошибка при обновлении категории",
        });
    }
};

// получить все категории
export const categoryControlller = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "Список всех категорий:",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Ошибка при получении категорий",
        });
    }
};

// single category
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Вы успешно получили одну категорию(slug)",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Ошибка при получении одной категории(slug)",
        });
    }
};

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Категория успешна удалена",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Ошибка при удалении категории",
            error,
        });
    }
};
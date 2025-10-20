import slugify from "slugify";
import CategoryModel from "../models/CategoryModel.js";

export const createCategoryController = async (req,res) => {
    try{
        const {name} = req.body;
        if(!name){
            return res.status(401).send({
                success: false,
                message: "Category name is required",
            });
        }
        const existingCategory = await CategoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success: true,
                message: "This Category Already Exists",
                existingCategory
            }); 
        }
        const newCategory = new CategoryModel({
            name,
            slug: slugify(name),
        });

        await newCategory.save();
        // console.log(newCategory);

        res.status(200).send({
            success: true,
            message: "Category Created Successfully",
            newCategory
        });
    }catch(error){
        // console.error("Error during creating category",error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category"
        });
    }
}


// UPDATE CATEGORY CONTROLLER
export const updateCategoryController = async (req,res) => {
    try{
        let {name} = req.body;
        let {id} = req.params;

        const category = await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            category,
        });

    }catch(error){
        // console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error white updating category"
        })
    }
}


export const categoryController = async (req,res) => {
    try{
        const category = await CategoryModel.find({});
        if(!category){
            return res.status(500).send({
                success: false,
                message: "It seems like no category exists",
            });
        }
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category,
        });
    }catch(error){
        // console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error occurred while getting all categories"
        });
    }
}


export const singleCategoryController = async (req,res) =>{
    try{
        const slug = req.params.slug;
        const category = await CategoryModel.findOne({slug});
        if(!category){
            return res.status(400).send({
                success: false,
                message: "This category not exists",
            });
        }
        res.status(200).send({
            success: true,
            message: "Get single category successfully",
            category,
        });
    }catch(error){
        // console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error occurred while getting single category",
        });
    }
}

export const deleteCategoryController = async (req,res) => {
    try {
        const {id} = req.params;
        const deletedCategory = await CategoryModel.findByIdAndDelete(id);
        if(!deletedCategory){
            return res.status(400).send({
                success: false,
                message: "This category does not exists",
            });
        }
        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
            deletedCategory
        });
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting category",
        });
    }
}
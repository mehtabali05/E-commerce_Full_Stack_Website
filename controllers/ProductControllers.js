import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
import ProductModel from "../models/ProductModel.js";
import slugify from "slugify";
import CategoryModel from "../models/CategoryModel.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);

 
export const createProductController = async (req,res) =>{
    try{
        let {name,description,price,category,quantity} = req.fields;
        let {photo} = req.files;

        switch(true){
            case !name:
                return res.status(500).send({error:"Name is required"});
            case !description:
                return res.status(500).send({error:"Description is required"});
            case !price:
                return res.status(500).send({error:"Price is required"});
            case !category:
                return res.status(500).send({error:"Category is required"});
            case !quantity:
                return res.status(500).send({error:"Quantity is required"});
            case photo && photo.size > 1000000:
                return res.status(500).send({error:"Photo is required"});
        }

        const products = new ProductModel({
            ...req.fields,
            slug: slugify(name)
        });

        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: " Product created successfully",
            products,
        });

    }catch(error){
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while creating product",
            error
        })
    }
}


export const updateProductController = async (req,res) =>{
    try{
        let {name,description,price,category,quantity} = req.fields;
        let {photo} = req.files;

        switch(true){
            case !name:
                return res.status(500).send({error:"Name is required"});
            case !description:
                return res.status(500).send({error:"Description is required"});
            case !price:
                return res.status(500).send({error:"Price is required"});
            case !category:
                return res.status(500).send({error:"Category is required"});
            case !quantity:
                return res.status(500).send({error:"Quantity is required"});
            case photo && photo.size > 1000000:
                return res.status(500).send({error:"Photo is required"});
        }

        const products = await ProductModel.findByIdAndUpdate(req.params.id,{
            ...req.fields,
            slug: slugify(name)
        },{new:true});

        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: " Product Updated successfully",
            products,
        });

    }catch(error){
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating product",
            error
        })
    }
}


export const getAllProductsController = async (req,res) =>{
    try {
        const allProducts = await ProductModel.find({}).populate("category").select("-photo").sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalCount: allProducts.length,
            message: " All Products",
            allProducts,
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error occurred while getting all products",
            error: error.message,
        });
    }
}

 

export const getSingleProductController = async (req,res) =>{ 
    try {
        const product = await ProductModel.findOne({slug:req.params.slug}).select("-photo").populate("category");
        if(!product){
            return res.status(404).send({
                success: false,
                message: "This Product does not exists"
            });
        }

        res.status(200).send({
            success: true,
            message: "Product details",
            product,
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: true,
            message: "Error occurred while getting Product Details",
            error,
        });
    }
}


export const productPhotoController = async (req,res) =>{
    try {
        const product = await ProductModel.findById(req.params.id).select("photo");
        // console.log(product);
        if(product.photo && product.photo.data){
            res.set("Content-Type",product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }else {
            return res.status(404).send("No photo found");
        }
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message:" Error while getting product photo",
            error,
        });
    }
}


export const deleteProductController = async (req,res) =>{
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).send({
              success: false,
              message: "Product not found",
            });
          }
        res.status(200).send({
            success: true,
            message: " Product deleted successfully",
            deletedProduct,
        });
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
}


export const productFilterController = async (req,res) =>{
    try{
        const {checked, radio} = req.body;
        let args = {};
        if(checked.length > 0) args.category = checked;
        if(radio.length) args.price = {$gte: radio[0],$lte:radio[1]};
        const products = await ProductModel.find(args);
        // console.log(products);
        res.status(200).send({
            success: true,
            products,
        });
    }catch(error){
        // console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while filtering products",
            error,
        });
    }
}


// PRODUCT COUNT CONTROLLER
export const productCountController = async (req,res) =>{
    try {
        const totalCount = await ProductModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            totalCount,
        })
    } catch (error) {
        // console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while counting products",
            error,
        });
    }
}


// PRODUCT PER PAGE CONTROLLER
export const productListController = async (req,res) =>{
    try{
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await ProductModel.find({}).select("-photo").skip((page-1) * perPage).limit(perPage).sort({createdAt: -1});
        res.status(200).send({
            success:true,
            products,
        })
    }catch(error){
        // console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting products per page",
            error,
        });
    }
}



export const searchProductController = async (req,res) =>{
    try {
        const {keyword} = req.params; 
        const searchedProducts = await ProductModel.find(
            {$or:[
                {name:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]}
        ).select("-photo");
        res.status(200).json({
            products:searchedProducts,
            success: true,
        });
    } catch (error) {
        // console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in Search Product API",
            error,
        });
    }
}



export const relatedProductsController = async (req,res) => {
    try {
        const {pId,cId} = req.params;
        const relatedProducts = await ProductModel.find(
            {category: cId,_id:{$ne:pId}}
        )
        .select("-photo")
        .limit(3)
        .populate("category");
        res.status(200).send({
            success: true,
            relatedProducts
        });
    } catch (error) {
        // console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting Related Products",
            error,
        });
    }
} 


export const categoryProductController = async (req,res) => {
    try {
        const category = await CategoryModel.find({slug:req.params.slug});
        // console.log(category);
        const products = await ProductModel.find({category}).populate("category");
        // console.log(products);
        res.status(200).send({
            success: true,
            category,
            products
        });
    } catch (error) {
        // console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting Category Products",
            error,
        });
    }
}

export const createCheckoutSessionController =  async (req,res) =>{
    try {
        const {products} = req.body;
        // console.log("Products in checkout",products);

        const lineItems = products.map((product) =>({
            price_data : {
                currency : "usd",
                product_data : {
                    name : product.name,
                    images : [product.image]
                },
                unit_amount : Math.round(product.price*100),
            },
            quantity:product.quantity
        })); 
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url: `${process.env.CLIENT_URL}/checkout-success`,
            cancel_url: `${process.env.CLIENT_URL}/checkout-failure`,
        });

        res.json({
            url:session.url,
            success:true,
        });

    } catch (error) {
        // console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in Stripe Checkout",
            error:error.message,
        });
        
    }
}


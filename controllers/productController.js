import productModel from "../models/productModel.js";
import slugify from "slugify";

export const create = async (req, res) => {
    try {
        const { name, description, price, categories, quantity, shipping } = req.body;
        // const { photo } = req.files;
        
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !categories:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            // case photo && photo.size > 1000000:

            // return res
            //     .status(500)
            //     .send({ error: "photo is Required and should be less then 1mb" });
            // }
        }

        const products = new productModel({ ...req.body, slug: slugify(name) });
        // if (photo) {
        //     products.photo.data = fs.readFileSync(photo.path);
        //     products.photo.contentType = photo.type;
        // }
        await products.save();

        res.status(201).send({
            success: true,
            message: "Product added successfully!",
            products,
        });

    } catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while creating"
        });
    }
};

export const getProducts = async (req, res) => {
    try {

        const products  = await productModel
            .find({})
            .populate("categories")
            .limit(12)
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "All products",
            products
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Product not found",
            error: error.message
        })
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const product = await productModel
            .findOne({slug: req.params.slug})
            .populate("categories");
        
        res.status(200).send({
            success: false,
            message: "Signle product fetched",
            product,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting single product",
            error: error.message
        })

    }
}


export const productFilter = async (req, res) => {
    try {

        const { checked, radio} = req.body;
        let args = {}

        if(checked.length > 0) args.categories = checked;
        if(radio.length) args.price = { $gte: radio[0], $lte: radio[1]};
        
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products
        });    
    } catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in products",
            error: error.message

        })
    }
}
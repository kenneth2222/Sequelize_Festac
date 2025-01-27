const e = require('express');
const productModel = require('../models/product');
const storeModel = require('../models/store');

exports.createProduct = async (req, res) => {
    try {        
        // const { ProductName, ProductQuantity, ProductAmount, storeId } = req.body;
        // const storeExists = await storeModel.findOne({ where: { id: storeId } });
        // if (!storeExists) {       
        //     return res.status(404).json({
        //         message: "Store not found"
        //     });
        // }                        
        // const newProduct = await productModel.create({ ProductName, ProductQuantity, ProductAmount, storeId });
        // res.status(201).json({
        //     message: "Product created successfully",
        //     data: newProduct
        // });   
        const storeId = req.params.storeId;
        const { ProductName, ProductQuantity, ProductAmount } = req.body;
        
        const newProduct = await productModel.create({ ProductName, ProductQuantity, ProductAmount, storeId });
        res.status(201).json({        
            message: "Product created successfully",        
            data: newProduct
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

exports.getOneProduct = async (req, res) => {            
    try {
        const { id } = req.params;
        const product = await productModel.findOne({ where: { id: id }, include: [{ model: Store, as: 'store', attributes: ["name", "location"] }] });
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.status(200).json({
            message: "Product found",
            data: product
        });
    } catch (error) {        
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }            
}

exports.getAllProductBelongingToAStore = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        const products = await productModel.findAll({ where: { storeId: storeId } });

        if (products.length == 0) {
            return res.status(404).json({
                message: "Products not found"
            });
        }

        res.status(200).json({
            message: "All products found",
            data: products,
            total: products.length
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}   

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { ProductName, ProductQuantity, ProductAmount } = req.body;
        const product = await productModel.findOne({ where: { id: id } });

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await product.update({ ProductName, ProductQuantity, ProductAmount });
        res.status(200).json({
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {     
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }    
}

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findOne({ where: { id: id } });

        if (!product) {           
            return res.status(404).json({
                message: "Product not found"
            });
        }        
        await product.destroy();
        res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}
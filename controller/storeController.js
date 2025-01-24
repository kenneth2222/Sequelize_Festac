const storeModel = require('../models/store');

exports.createStore = async (req, res) => {
    try {
        const { name, email, location } = req.body;

        const storeExits = await storeModel.findOne({ where: { email: email.toLowerCase()}});

        if (storeExits) {
            return res.status(409).json({
                message: "Store already exists"
            });
        }

        const newStore = await storeModel.create({
            name,
            email: email.toLowerCase(),
            location
        });

        res.status(201).json({
            message: "Store created successfully",
            data: newStore
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

exports.getAllStores = async (req, res) => {
    try {
        const allStores = await storeModel.findAll();

        res.status(200).json({
            message: "All stores in the database",
            data: allStores,
            total: allStores.length
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

exports.getOneStore = async (req, res) => {
    try {                
        const { id } = req.params;
        const store = await storeModel.findOne({ where: { id: id }, include: [{ model: productModel, attributes: ["productName", "productQuantity", "productAmount"] }] });


        if (!store) {
            return res.status(404).json({
                message: "Store not found"
            });
        }

        res.status(200).json({
            message: "Store found",
            data: store
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}       

// exports.getOneStore = async (req, res) => {
//     try {                
//         const { id } = req.params;
//         const store = await storeModel.findByPk(id);

//         if (!store) {
//             return res.status(404).json({
//                 message: "Store not found"
//             });
//         }
//         //Send a success response

//         res.status(200).json({
//             message: "Store found",
//             data: store
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: "Internal server error",
//             error: error.message
//         });                         
//     }   
// }
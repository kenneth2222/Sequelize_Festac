const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');

exports.newUser = async (req, res) => {
    try {
        //Get the data from the request body
        const { firstName, lastName, email, age, password } = req.body;

        const userExists = await User.findAll({ where: { name: firstName } });

        if(userExists.length == 1) {
            //Send an error response
            res.status(409).json({
                message: 'User already exists'
            });
        } else {

                 //Create the new user data into the database
        const newUserData = await User.create({ id: uuidv4(), firstName, lastName, email, age, password });

        //Send a success response
        res.status(201).json({
            message: 'User created successfully',
            data: newUserData
        });
        }

    } catch (error) {
        // console.error(error);
        res.status(500).json({ 
            message: error.message });    
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        //Get all users
        const allUsers = await User.findAll();
        //Send a success response
        res.status(200).json({
            message: 'All users in the database',
            data: allUsers,
            total: allUsers.length
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Internal Server Error' + error.message 
        });
    }
};


exports.getOneUser = async (req, res) => {
    try {

        const { id } = req.params;
        // const allUsers = await User.findAll();
        // const user = allUsers.find((user) => user.id == id);
        const user = await User.findAll({where: {id: id}});
        // const name = await User.findAll({where: {name: firstName}}); //You run this when you want to search by name

        if (user.length == 0) {
            //Send an error response
            res.status(404).json({
                message: 'User Not Found'
            });
        }else{
            res.status(200).json({
                message: 'User Found',
                data: user
            });
        }
//Send a success response
       
    } catch (error) {
        res.status(500).json({ 
            message: 'Internal Server Error' + error.message 
        });
    }
};

exports.delUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, age, password } = req.body;
    
        const user = await User.findAll({ where: { id: id } });
    
        if (user.length == 0) {
          //Send an error response
          res.status(404).json({
            message: "User Not Found",
          });
        } else {
          const data = (
            firstName,
            lastName,
            email,
            age,
            password
          );
  
          await User.destroy({ where: { id: id } });
  
          const updatedUser = await User.findAll({ where: { id: id } });
    
          res.status(200).json({
            message: "User deleted successfully",
            data: updatedUser,
            total: updatedUser.length,
          });
        }
     
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  exports.updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, age, password } = req.body;
  
      const user = await User.findAll({ where: { id: id } });
  
      if (user.length == 0) {
        //Send an error response
        res.status(404).json({
          message: "User Not Found",
        });
      } else {
        const data = (
          firstName,
          lastName,
          email,
          age,
          password
        );

        await User.update(data, { where: { id: id } });

        const updatedUser = await User.findAll({ where: { id: id } });
  
        res.status(200).json({
          message: "User updated successfully",
          data: updatedUser,
          total: updatedUser.length,
        });
      }
  
      
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  };
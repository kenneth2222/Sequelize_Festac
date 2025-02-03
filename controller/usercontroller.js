const UserModel = require("../models/user");
const { v4: uuidv4 } = require("uuid");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    // const {name, role} = req.body;

    if (users.length === 0) {
      res.status(409).json({
        message: `There is no data in the database`,
      });
    } else {
      res.status(200).json({
        message: `All users in the database`,
        data: users,
        total: users.length,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error` + error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, role } = req.body;

    if (!name || !role) {
      res.status(400).json({
        message: `All Fields Are Required`,
      });
    }
    const normalizedName = name.toLowerCase();
    const normalizedRole = role.toLowerCase();

    const roleExists = await UserModel.findOne({
      where: { role: normalizedRole, name: normalizedName },
    });

    if (roleExists) {
      res.status(400).json({
        message: `Role Already Assigned To User`,
      });
    } else {
      const newUser = await UserModel.create({
        id: uuidv4(),
        name: normalizedName,
        role: normalizedRole,
      });

      res.status(201).json({
        message: `User Created Successfully`,
        data: newUser,
      });
    }
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({
      message: `Internal Server Error` + error.messsage,
    });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOne({ where: { id: id } });

    if (!user) {
      res.status(404).json({
        message: `User With ID: ${id} Not Found`,
      });
    } else {
      res.status(200).json({
        message: `User with ID: ${id}`,
        data: user,
      });
    }
  } catch (error) {
    console.error(`Error Getting User With ID: ${id}`);
    res.status(500).json({
      message: `Internal Server Error` + error.message,
    });
  }
};



exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, name } = req.body;

    const user = await UserModel.findOne({ where: { id: id } });

    if (!user) {
      res.status(404).json({
        message: `User With ID: ${id} Not Found`,
      });
    } else {
      const updateData = {};
      if (name) {
        updateData.name = name.toLowerCase();
      }
      if (role) {
        updateData.role = role.toLowerCase();
      }

      await UserModel.update(updateData, { where: { id: id } });

      const updatedUser = await UserModel.findAll({ where: { id: id } });

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

exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
    //   const { role, name } = req.body;
  
      const user = await UserModel.findOne({ where: { id: id } });
  
      if (!user) {
        res.status(404).json({
          message: `User With ID: ${id} Not Found`,
        });
      } else {
       
  
        await UserModel.destroy({ where: { id: id } });
  
        const newData = await UserModel.findAll();
  
        res.status(200).json({
          message: "User deleted successfully",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  };
  
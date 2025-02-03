const taskModel = require('../models/task');
const userModel = require('../models/user');
const statusModel = require('../models/status');
const { v4: uuidv4 } = require("uuid");

exports.getAllTasks = async (req, res) => {
    try {
      const tasks = await taskModel.findAll();
      console.log("All tasks:", tasks.length);
      console.log("All tasks:", tasks);
  
      if (!tasks.length) {
        return res.status(404).json({
          message: "No tasks found in the database",
        });
      }
  
      return res.status(200).json({
        message: "All tasks retrieved successfully",
        data: tasks,
        total: tasks.length,
      });
    } catch (error) {
      console.error("Error getting all tasks:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  exports.createTask = async (req, res) => {
    try {
        const {id} = req.params;
      const { title, description, statusId } = req.body;
  
      // Check if user exists
      const user = await userModel.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: `User with ID: ${id} not found` });
      }
  
      // Check if status exists
      const status = await statusModel.findByPk(statusId);
      if (!status) {
        return res.status(404).json({ message: `Status with ID: ${statusId} not found` });
      }
  
      // Create task
      const newTask = await taskModel.create({
        id: uuidv4(),
        title,
        description,
        userId: id,
        statusId,
      });
  
      return res.status(201).json({
        message: "Task created successfully",
        data: newTask,
      });
  
    } catch (error) {
      console.error("Error creating task:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
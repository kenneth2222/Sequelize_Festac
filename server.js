const express = require('express');
const { sequelize } = require('./database/sequelize');
const app = express();
const PORT = 3000;


const statusRouter = require('./routes/statusRouter');
const taskRouter = require('./routes/taskRouter');
const userRouter = require('./routes/userRouter');
app.use(express.json());
// app.use(userRouter);

app.use(statusRouter);
app.use(taskRouter);
app.use(userRouter);

const server = async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }catch(error){
        console.error('Unab to connect to the database:', error.message);
}
}

//Invoke the server function
server();


app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});
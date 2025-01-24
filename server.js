const express = require('express');
const { sequelize } = require('./Database/sequelize');
const app = express();
const PORT = 3000;
// const userRouter = require('./routes/userRouter');//
const storeRouter = require('./routes/storeRouter');
app.use(express.json());
// app.use(userRouter);

app.use(storeRouter);
// app.get('/', (req, res) => {
//     res.send('Welcome To My Sequelize Class');
// })

const server = async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }catch(error){
        console.error('Unable to connect to the database:', error.message);
}
}

//Invoke the server function
server();

//Listen to port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
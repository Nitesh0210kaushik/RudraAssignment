const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

require('./db/Config');
require('./models/UserModel');

const userAuthRoutes = require('./routes/userAuth');
const userPasswordRoutes = require('./routes/userPassword');
app.use('/user', userAuthRoutes);
app.use('/pass', userPasswordRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const morgan = require('morgan'); // for logging requests
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const blogRoute = require('./routes/blog');
const authRoute = require('./routes/auth'); // Import auth route

const app = express();

//connect clound database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
})
.then(() => console.log("DB Connected"))
.catch((err) => console.log( err));

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//route
app.use('/api', blogRoute);
app.use('/api', authRoute); // Use auth route

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));

